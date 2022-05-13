import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn, Hr } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import Switch from '../../../ui/Switch';
import { STYLES as c } from '../../../../utils/constants'
import { getAllAvailableReservationsGolf, createReservationGolf } from '../../../../utils/client';
import GuestsSection from '../../../ui/GuestsSection';

export default function GolfClassesScreen(props) {
	const [allReservations, setAllReservations] = useState([]);
	//Fechas
	const [selectedDate, setSelectedDate] = useState(null);
	const [shownReservations, setShownReservations] = useState([]);
	const [selectedReservationId, setSelectedReservationId] = useState(null);
	//Invitados
	const [guests, setGuests] = useState([]);
	const [maxGuests, setMaxGuests] = useState(0);
	//Hoyos y carritos
	const [holesEnabled, setHolesEnabled] = useState(true);
	const [karts, setKarts] = useState('0');
	//Guardar reservación
	const [savedReservation, setSavedReservation] = useState(false);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	/* When app did mount */
	useEffect(() => {
		retrieveDataFromDB().then(data => setAllReservations(data));

		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow',
			() => {
			  setKeyboardVisible(true);
			}
		  );
		  const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
			  setKeyboardVisible(false);
			}
		  );
	  
		  return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		  }; 
	}, []);

	/* When the selected Date changes, we need to update the reservations available */
	useEffect(() => {
		if (selectedDate !== null && selectedDate !== undefined) {
			let reservations = JSON.parse(JSON.stringify(allReservations));
			reservations = reservations.filter(i => i.datetime.split('T')[0]===selectedDate.split('T')[0]);
			reservations = reservations.map(i => {
				i.datetime = new Date(i.datetime);
				return i;
			});
			setSelectedReservationId(null);
			setShownReservations(reservations);
		}
	} , [selectedDate]);

	const onSubmit = () => {
		if (guests.length <= maxGuests) {
			const reservationData = {
				objectId: selectedReservationId,
				estatus: 2,
			};
			const reservationGolfData = {
				carritosReservados: parseInt(karts),
				cantidadHoyos: holesEnabled ? 18 : 9,
			};
			createReservationGolf(reservationData, reservationGolfData, guests, () => {
				setSavedReservation(true);
				setShownReservations([]);
				setSelectedDate(null);
				setSelectedReservationId(null);
				setGuests([]);
				Alert.alert('Guardado exitoso', 'Se ha guardado la reservación', [
					{text: 'Aceptar'}
				])
				retrieveDataFromDB().then(data => setAllReservations(data))
				.catch(error => console.log(error));
			});
		}else {
			Alert.alert('Máximo de invitados alcanzado', 'Se ha rebasado el máximo de invitados en el horario seleccionado', [
				{text: 'Aceptar'}
			])
		}
	};

	return (
		<ScreenContainer style={{paddingTop: 0, flex: 1}} key={savedReservation}>
		<ScrollView style={{paddingTop: 0, flex: 1}} contentContainerStyle={{ flexGrow: 1 }}>
			
			{/* Hoyos a jugar y carritos */}
			<View style={style.tableContainer}>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Hoyos a jugar</P>
					</View>
					<View style={style.tableCol2}>
						<Switch defaultValue={true} 
								onValueChange={val => setHolesEnabled(val)}
								activeText='18' 
								inactiveText='09'
								/>
					</View>
				</View>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Rentar carritos</P>
					</View>
					<View style={style.tableCol2}>
							<TextInput style={style.textInput}
								keyboardType='numeric'
								onChangeText={val => setKarts(val)}
								maxLength={2}
								value={karts}
								keyboard
								/>
					</View>
				</View>

			</View>

			{/* Selecciona la fecha y hora de la reservacion */}
			<View>
				<Subtitle>Selecciona la fecha y la hora</Subtitle>

				{/* Date picker */}
				<ScrollView style={style.datePickerContainer} horizontal={true}>
					{ getCalendarOptions(allReservations).map( date => {
						return (
							<DateOption 
								defaultActive={false} 
								datetime={date.toISOString()} 
								day={date.getDay()}
								date={date.getDate()}
								onClick={datetime => setSelectedDate(datetime)}
								selectedDate={selectedDate}
								key={date.toISOString()}
							/>
						);
					}) }
				</ScrollView>

				{/* Hour picker */}
				<View style={style.timePickerContainer} >
					{ Object.keys(groupByProfessor(shownReservations)).map(
						(key, index) => {
							return (
								<View key={`${key}-container`} style={style.reservationsGroup}>
									<P key={`${key}-paragraph`} size='large'>{key}</P>
									<View style={style.reservationsContainer}>
										{groupByProfessor(shownReservations)[key].map( 
											i => {
												return (
													<CapsuleBtn 
														defaultActive={false}
														title={i.datetime.toISOString().slice(11,16)}
														subtitle={i.hoyo_inicio}
														value={i.id}
														onClick={id => {
																setSelectedReservationId(id);
																setMaxGuests(i.maximoJugadores);
															}}
														selectedReservationId={selectedReservationId}
														setSelectedReservationId={setSelectedReservationId}
														key={`${i.id}-capsule`}
													/>
												);
											}
										)}
									</View>
									{ index+1 < Object.keys(groupByProfessor(shownReservations)).length && 
										<Hr/>
									}
								</View>
							);
						}) 
					}
				</View>
			</View>

			{/* Agrega los invitados */}
			<View>
				{ selectedReservationId && 
					<GuestsSection guests={guests} 
									setGuests={setGuests}
									maxGuests={maxGuests}
					/>
				}
			</View>
			
			{selectedReservationId && !isKeyboardVisible ? (
				<View style={style.actionBtnContainer}>
					<ActionBtn title="Hacer Reservación" onPress={onSubmit}/>
				</View>
				) : null
			}
		</ScrollView>
		</ScreenContainer>
	);
}


const retrieveDataFromDB = async () => {
	const response = await getAllAvailableReservationsGolf(true);
	const data = [];
	response.forEach(i => {
		data.push({id: i.id, 
					datetime: i.get('fechaInicio').toISOString(), 
					profesor: {id:i.get('profesor').get('id'), nombre: i.get('profesor').get('nombre')},
					hoyo_inicio: i.get('sitio').get('nombre'),
					maximoJugadores: i.get('maximoJugadores')})
		});
	return data;
}

const groupByProfessor = reservationsList => {
	const result = {};
	reservationsList.forEach(i => {
		const key = i.profesor.nombre;
		if (!(key in result))
			result[key] = [];
		result[key].push(i);
	});
	return result;
};

const getCalendarOptions = data => {
	if (data.length === 0 || data === undefined)
		return [];

	const dates = [];
	const seen = new Set();
	data.forEach(row => {
		const d = row.datetime.split('T')[0];
		if (!seen.has(d)){
			const date = new Date(row.datetime);
			dates.push(date);
			seen.add(d);
		}
	});
	dates.sort( (a,b) => a.getFullYear()-b.getFullYear() || a.getMonth()-b.getMonth() || a.getDate()-b.getDate());
	return dates;
};

const style = StyleSheet.create({
	tableContainer: {
		justifyContent: 'flex-start',
		marginVertical: 20
	},

	tableRow: {
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginVertical: 5
	},

	tableCol1: {
		alignSelf: 'center',
		flex: 2
	},

	tableCol2: {
		alignSelf: 'flex-start',
		flex: 3
	},

	datePickerContainer: {
		flexDirection: 'row',
		marginTop: 20
	},

	timePickerContainer: {
		marginTop: 25
	},

	guestsContainer: {
		marginTop: 20
	},

	actionBtnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%',
		bottom: 20,
		position: 'absolute'
	},

	textInput: {
		color: c.color.primaryColor,
		backgroundColor: c.color.grey,
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: 100,
		height: 33
	}
})
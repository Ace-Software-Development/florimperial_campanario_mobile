// M011 M020 M024
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn, Hr } from '../../ui/CampanarioComponents';
import DateOption from '../../ui/DateOption';
import CapsuleBtn from '../../ui/CapsuleBtn';
import Switch from '../../ui/Switch';
import { STYLES as c } from '../../../utils/constants'
import { getAllAvailableReservationsGolf,
		createReservationGolf,
		getAllAvailableReservationsGym, 
		createReservationGym,
		getAllAvailableReservationsRaqueta,
		getAllAvailableReservationsPool,
		createReservationRaqueta } from '../../../utils/client';
import { getCalendarOptions, normalizeYearMonthDayFormat, getTime } from '../../../utils/timeHelpers';
import { reservationMadeContext } from '../../../utils/context';
import GuestsSection from '../../ui/GuestsSection';
import NumericInput from 'react-native-numeric-input';

export default function ClassesReservationsScreen({route, navigation}){
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
	const [karts, setKarts] = useState(0);
	//Guardar reservación
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const {reservationMade, setReservationMade} = useContext(reservationMadeContext);

	
	/* When app did mount */
	useEffect(() => {
		let componentMounted = true;
		let fetchReservationsData = null;
		if (route.params.module == 'golf')
			fetchReservationsData = () => getAllAvailableReservationsGolf(true);
		else if (route.params.module == 'gym')
			fetchReservationsData = () => getAllAvailableReservationsGym(true);
		else if (route.params.module == 'raqueta')
			fetchReservationsData = () => getAllAvailableReservationsRaqueta(true);
		else if (route.params.module == 'pool')
			fetchReservationsData = () => getAllAvailableReservationsPool(true);

		/* Add keyboard listener */
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

		  fetchReservationsData().then( response => {
			const data = [];
			response.forEach(i => {
				data.push({id: i.id, 
							datetime: i.get('fechaInicio'), 
							profesor: {id:i.get('profesor').get('id'), nombre: i.get('profesor').get('nombre')},
							hoyo_inicio: i.get('sitio').get('nombre'),
							maximoJugadores: i.get('maximoJugadores')
						});
			});

			if (componentMounted)
				setAllReservations(data);
		});
	  
		/* ComponentWillUnmount */
		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		  }; 
	}, []);

	/* When the selected Date changes, we need to update the reservations available */
	useEffect(() => {
		if (selectedDate !== null && selectedDate !== undefined) {
			// We need to make a deep copy of the reservations, but then we need to remade the Date objects
			let reservations = allReservations.map(reservation => {return{...reservation, datetime:reservation.datetime.toString()}});
			reservations = JSON.parse(JSON.stringify(reservations));
			reservations = reservations.map(reservation => {return{...reservation, datetime:new Date(reservation.datetime)}});
			
			// Find all reservations with the same Month, Year and Day
			reservations = reservations.filter(i => normalizeYearMonthDayFormat(i.datetime)===normalizeYearMonthDayFormat(selectedDate));
			setSelectedReservationId(null);
			setShownReservations(reservations);
		}
	} , [selectedDate]);

	/**
     * Saves selected reservation on DB 
     * @returns true if all conditions are met, else
     * @returns false
     */
	const onSubmit = async () => {
		if (guests.length > maxGuests) {
			Alert.alert('Máximo de invitados alcanzado', 'Se ha rebasado el máximo de invitados en el horario seleccionado', [
				{text: 'Cerrar'}
			]);
			return false;
		}

		if (route.params.module === 'raqueta' && guests.length < 1) {
			Alert.alert('Agregue invitados', 'Deben haber mínimo dos personas para reservar una cancha', [
				{text: 'Cerrar'}
			]);
			return false;
		}
		
		const reservationData = {
			objectId: selectedReservationId,
			estatus: 2,
		};

		let reservationCompleted = null;
		switch (route.params.module) {
			case 'golf':
				const reservationGolfData = {
					carritosReservados: parseInt(karts),
					cantidadHoyos: holesEnabled ? 18 : 9,
				}
				reservationCompleted = await createReservationGolf(reservationData, reservationGolfData, guests);
				break;

			case 'gym':
				reservationCompleted = await createReservationGym(reservationData);

			case 'raqueta':
				reservationCompleted = await createReservationRaqueta(reservationData, guests);
		};

		// Si hubo un error al tratar de guardar la reservación
		if (!reservationCompleted) {
			Alert.alert('Guardar reservación fallida', 'Ocurrió un error al tratar de guardar la reservación.', [
				{text: 'Cerrar'}
			]);
			return false;
		}

		// Si llegamos hasta esta parte, podemos forzar un reMount
		Alert.alert('Guardado exitoso', 'Se ha guardado la reservación', [
			{text: 'Cerrar', 
			onPress: () => {
				setReservationMade(!reservationMade);
				navigation.navigate('module_main');
			}}
		]);
		return true;
	};

	if (allReservations.length < 1) {
		return (
			<ScreenContainer style={{paddingTop: 0, flex: 1}}><Subtitle style={{marginTop:15}}>No hay reservaciones actualmente.</Subtitle></ScreenContainer>
		);
	} else

	return (
		<ScreenContainer style={{paddingTop: 0, flex: 1}}>
		<ScrollView style={{paddingTop: 0, flex: 1, marginVertical: 30}} contentContainerStyle={{ flexGrow: 1 }}>
			
			{/* Hoyos a jugar y carritos */}
			{ route.params.module === 'golf' && 
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
							<NumericInput
									rounded
									type='plus-minus'
									onChange={val => setKarts(val)}
									totalHeight = {40}
									totalWidth = {100}
									minValue={0}
									maxValue={69}
									valueType='integer'
									value={karts}
							/>
						</View>
					</View>

				</View>
			}

			{/* Selecciona la fecha y hora de la reservacion */}
			<View>
				<Subtitle>Selecciona la fecha</Subtitle>

				{/* Date picker */}
				<ScrollView style={style.datePickerContainer} horizontal={true}>
					{ getCalendarOptions(allReservations).map( date => {
						return (
							<DateOption 
								defaultActive={false} 
								datetime={date} 
								day={date.getDay()}
								date={date.getUTCDate()}
								onClick={datetime => setSelectedDate(datetime)}
								selectedDate={selectedDate}
								key={date.toISOString()}
							/>
						);
					}) }
				</ScrollView>

				<Subtitle style={{marginTop:15}}>Selecciona la hora</Subtitle>

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
														title={getTime(i.datetime)}
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
			{ route.params.showGuests && 
				<View>
					{ selectedReservationId && 
						<GuestsSection guests={guests} 
										setGuests={setGuests}
										maxGuests={maxGuests}
						/>
					}
				</View>
			}
			
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


const style = StyleSheet.create({
	tableContainer: {
		justifyContent: 'flex-start',
		marginBottom: 20
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
});

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
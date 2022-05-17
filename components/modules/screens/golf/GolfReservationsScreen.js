import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import GuestsSection from '../../../ui/GuestsSection';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import Switch from '../../../ui/Switch';
import { getAllAvailableReservationsGolf, createReservationGolf } from '../../../../utils/client';
import { reservationMadeContext } from '../../../../utils/context';
import { STYLES as c } from '../../../../utils/constants';


export default function GolfReservationsScreen(props) {
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
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);
	const {reservationMade, setReservationMade} = useContext(reservationMadeContext);

	/* ComponentDidMount */
	useEffect(() => {
		let componentMounted = true;

		/* Add keyboard listener */
		const keyboardDidShowListener = Keyboard.addListener(
			'keyboardDidShow', () => {
			  setKeyboardVisible(true);
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
		'keyboardDidHide', () => {
			setKeyboardVisible(false);
		});

		getAllAvailableReservationsGolf().then( response => {
			const data = [];
			response.forEach(i => {
				data.push({id: i.id, 
							datetime: i.get('fechaInicio').toISOString(), 
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

	/* selectedDate changed value */
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


	const onSubmit = async () => {
		if (guests.length > maxGuests) {
			Alert.alert('Máximo de invitados alcanzado', 'Se ha rebasado el máximo de invitados en el horario seleccionado', [
				{text: 'Cerrar'}
			]);
			return false;
		}

		const reservationData = {
			objectId: selectedReservationId,
			estatus: 2,
		};
		const reservationGolfData = {
			carritosReservados: parseInt(karts),
			cantidadHoyos: holesEnabled ? 18 : 9,
		};
		const reservationCompleted = await createReservationGolf(reservationData, reservationGolfData, guests);

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
				props.navigation.navigate('module_main');
			}}
		]);
		return true;
	};

	return (
		<ScreenContainer style={{paddingTop: 0, flex: 1}}>
		<ScrollView style={{paddingTop: 0, flex: 1}} contentContainerStyle={{ flexGrow: 1 }} >
			
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
					{ shownReservations.map(i => {
						return (
							<CapsuleBtn 
								defaultActive={false}
								title={i.datetime.toISOString().slice(11,16)}
								subtitle={i.hoyo_inicio}
								value={i.id}
								onClick={id => {setSelectedReservationId(id); setMaxGuests(i.maximoJugadores); }}
								selectedReservationId={selectedReservationId}
								setSelectedReservationId={setSelectedReservationId}
								key={i.id}
							/>
						);
					}) }
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
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 25
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


const getCalendarOptions = data => {
	if (data.length == 0)
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
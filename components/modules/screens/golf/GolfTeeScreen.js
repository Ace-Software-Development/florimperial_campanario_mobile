import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import { STYLES as c } from '../../../../utils/constants'
import { getAllAvailableReservationsGolfTee, createReservationGolf } from '../../../../utils/client';
import GuestsSection from '../../../ui/GuestsSection';

export default function GolfTeeScreen(props) {
	const [allReservations, setAllReservations] = useState([]);
	//Fechas
	const [selectedDate, setSelectedDate] = useState(null);
	const [shownReservations, setShownReservations] = useState([]);
	const [selectedReservationId, setSelectedReservationId] = useState(null);
	//Invitados
	const [guests, setGuests] = useState([]);
	const [maxGuests, setMaxGuests] = useState(0);
	//Guardar reservación
	const [savedReservation, setSavedReservation] = useState(false);
	const [isKeyboardVisible, setKeyboardVisible] = useState(false);


	const retrieveDataFromDB = () => {
		getAllAvailableReservationsGolfTee().then( response => {
			const data = [];
			response.forEach(i => {
				data.push({id: i.id, 
							datetime: i.get('fechaInicio').toISOString(), 
							hoyo_inicio: i.get('sitio').get('nombre'),
							maximoJugadores: i.get('maximoJugadores')
						})
				});
			setAllReservations(data);
		});
	}

	/* When app did mount */
	useEffect(() => {
		/* Get data from DB */
		retrieveDataFromDB();

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

	/* Obtener todas las fechas de las reservaciones */
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
			createReservationGolf(reservationData, undefined, guests, () => {
				setSavedReservation(true);
				setShownReservations([]);
				setSelectedDate(null);
				setSelectedReservationId(null);
				setGuests([]);
				Alert.alert('Guardado exitoso', 'Se ha guardado la reservación', [
					{text: 'Aceptar'}
				])
				retrieveDataFromDB();
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

			{/* Selecciona la fecha y hora de la reservacion */}
			<View style={style.reservationsContianer}>
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
			
			{/* Invitados */}
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
	reservationsContianer: {
		marginVertical: 20
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
	}
})

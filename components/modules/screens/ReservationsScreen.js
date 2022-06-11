// M012 M014 M019 M023

import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../ui/CampanarioComponents';
import GuestsSection from '../../ui/GuestsSection';
import DateOption from '../../ui/DateOption';
import CapsuleBtn from '../../ui/CapsuleBtn';
import Switch from '../../ui/Switch';
import { getAllAvailableReservationsGolf, getAllAvailableReservationsGolfTee, createReservationGolf, createReservationGym, getAllAvailableReservationsGym, getAllAvailableReservationsRaqueta, createReservationRaqueta, getAllAvailableReservationsPool, createReservationPool, getAllAvailableReservationsSalones, createReservationSalones } from '../../../utils/client';
import { reservationMadeContext } from '../../../utils/context';
import { getCalendarOptions, getISOString, getTime, normalizeYearMonthDayFormat } from '../../../utils/timeHelpers';
import { STYLES as c } from '../../../utils/constants';
import NumericInput from 'react-native-numeric-input';

export default function ReservationsScreen({route, navigation}) {
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
    
	let fetchReservationsData = null;
	if (route.params.module == 'golf')
    	fetchReservationsData = getAllAvailableReservationsGolf;
	else if (route.params.module == 'golf_tee')
		fetchReservationsData = getAllAvailableReservationsGolfTee;
	else if (route.params.module == 'gym')
		fetchReservationsData = getAllAvailableReservationsGym;
	else if (route.params.module == 'raqueta')
		fetchReservationsData = getAllAvailableReservationsRaqueta;
	else if (route.params.module == 'pool')
		fetchReservationsData = getAllAvailableReservationsPool;
	else
		fetchReservationsData = getAllAvailableReservationsSalones;

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

		fetchReservationsData().then( response => {
			const data = [];
			response.forEach(i => {
				let endDate = new Date(i.get('fechaInicio'));
				endDate.setHours(endDate.getHours(), endDate.getMinutes()+30,0,0);
				data.push({id: i.id, 
							datetime: i.get('fechaInicio'), 
							datetimeF: endDate,
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
        if (route.params.showGuests && guests.length > maxGuests) {
			Alert.alert('Máximo de invitados alcanzado', 'Se ha rebasado el máximo de invitados en el horario seleccionado', [
				{text: 'Cerrar'}
			]);
			return false;
		}

		const reservationData = {
			objectId: selectedReservationId,
			maximoJugadores: maxGuests,
			estatus: 2,
		};

        let reservationCompleted = null;

        switch(route.params.module) {

            case 'golf':
                const reservationGolfData = {
                    carritosReservados: parseInt(karts),
                    cantidadHoyos: holesEnabled ? 18 : 9,
                };
                reservationCompleted = await createReservationGolf(reservationData, reservationGolfData, guests);
                break;
			
			case 'golf_tee':
				reservationCompleted = await createReservationGolf(reservationData, undefined, guests, true);
                break;

            case 'gym':
                reservationCompleted = await createReservationGym(reservationData);
                break;

			case 'raqueta':
				reservationCompleted = await createReservationRaqueta(reservationData, guests);
				break;

			case 'pool':
				reservationCompleted = await createReservationPool(reservationData);
				break;

			case 'salones':
				reservationCompleted = await createReservationSalones(reservationData);
				break;

        }

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

    return (
		<ScreenContainer style={{paddingTop: 0, flex: 1}}>
		<ScrollView style={{paddingTop: 0, flex: 1}} contentContainerStyle={{ flexGrow: 1 }} >
			
			{/* Hoyos a jugar y carritos */}
            { route.params.module == 'golf' && 
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
				<Subtitle>Selecciona la fecha y la hora</Subtitle>

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

				{/* Hour picker */}
				<View style={style.timePickerContainer} >
					{ shownReservations.map(i => {
						return (
							<CapsuleBtn 
								defaultActive={false}
								title={getTime(i.datetime)}
								endTime={i.datetimeF.slice(11,16)}
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
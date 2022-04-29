import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import Switch from '../../../ui/Switch';
import { STYLES as c } from '../../../../utils/constants'
import { getAllAvailableReservationsGolf, createReservationGolf, createGuest } from '../../../../utils/client';
import Guests from '../../../ui/Guests';

export default function GolfClassesScreen(props) {
	const [allReservations, setAllReservations] = useState([]);
	//Fechas
	const [selectedDate, setSelectedDate] = useState(null);
	const [shownReservations, setShownReservations] = useState([]);
	const [selectedReservationId, setSelectedReservationId] = useState(null);
	//Invitados
	const [guest, setGuest] = useState();
    const [guests, setGuests] = useState([]);
    const maxGuests = 4;
	var pressed = 0;
	//Hoyos y carritos
	const [holesEnabled, setHolesEnabled] = useState(true);
	const [karts, setKarts] = useState(0);
	//Guardar reservación
	const [savedReservation, setSavedReservation] = useState(false);

	const retrieveDataFromDB = () => {
		getAllAvailableReservationsGolf().then( response => {
			const data = [];
			response.forEach(i => {
				data.push({id: i.id, 
							datetime: i.get('fechaInicio').toISOString(), 
							hoyo_inicio: i.get('sitio').get('nombre')})
				});
			setAllReservations(data);
		});
	}

	/* When app did mount */
	useEffect(() => {
		/* Get data from DB */
		retrieveDataFromDB();

	}, []);

	/* Se agregan invitado a la lista unicamente si no se ha alcanzado el máximo de invitados */
    const handleAddGuests = () => {
        Keyboard.dismiss();
		if(guests.length < maxGuests && guest != null){
			setGuests([...guests, guest]);
            setGuest(null);
        }else if(guest == null){
			pressed++;
			if(pressed > 5){
				Alert.alert('No se ha introducido ningún nombre', 'Escriba el nombre del invitado', [
					{text: 'Aceptar'}
				])
				pressed = 0;
			}
		}else{
			Alert.alert('Máximo alcanzado', 'Ya no se pueden agregar mas invitados', [
				{text: 'Aceptar'}
			])
        }
    }

	/* Se borran los invitados seleccionados */
	const deleteGuest = (index) => {
		let guestsCopy = [...guests];
		guestsCopy.splice(index, 1);
		setGuests(guestsCopy);
	}

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
		const reservationData = {
			objectId: selectedReservationId,
			estatus: 2,
			//socio: ""
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
			retrieveDataFromDB();
		});
	};

	return (
		<ScrollView>
		<ScreenContainer style={{paddingTop: 0}} key={savedReservation}>
			
			{/* Hoyos a jugar y carritos */}
			<View style={style.tableContainer}>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Hoyos a jugar:</P>
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
						<P >Carritos rentados:</P>
					</View>
					<View style={style.tableCol2}>
							<TextInput style={style.textInput}
								keyboardType='numeric'
								onChangeText={val => setKarts(val)}
								maxLength={2}
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
								onClick={id => setSelectedReservationId(id)}
								selectedReservationId={selectedReservationId}
								key={i.id}
							/>
						);
					}) }
				</View>
			</View>

			{/* Agrega los invitados */}
			<View style={style.guestsContainer}>
				<Subtitle>Agrega más asistentes</Subtitle>
				<KeyboardAvoidingView
					behavior={Platform.OS == "ios" ? "padding" : "height"}
					style={style.keyboardContainer}
				>
					<TextInput 
						placeholder={'Escribe el nombre del invitado'}
						style={style.input}
						value={guest}
						onChangeText={text => setGuest(text)}/>
					<TouchableOpacity onPress={() => handleAddGuests()}>
						<View style={style.addWrapper}>
							<P color="light">+</P>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
				<View>
					{/* Aqui van a ir los invitados agregados */}
					{
						guests.map((item, index) => {
							return (
								<TouchableOpacity key={index} onPress={() => deleteGuest(index)}>
									<Guests text={item} />
								</TouchableOpacity>)
						})
					}
				</View>
			</View>
			
			{selectedReservationId ? (
				<ActionBtn title="Guardar" onPress={onSubmit}/>
				) : null
			}
		</ScreenContainer>
		</ScrollView>
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

	guestsContainer: {
		marginTop: 20
	},

	actionBtnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},

	textInput: {
		color: c.color.primaryColor,
		backgroundColor: c.color.grey,
		paddingVertical: 3,
		paddingHorizontal: 10,
		borderRadius: 10,
		width: 100,
		height: 33
	},

	keyboardContainer: {
        alignItems: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    input: {
        backgroundColor: c.color.grey,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 10,
		width: '80%',
		fontSize: RFPercentage(2.1)
    }, 

    addWrapper: {
        width: 35,
        height: 35,
		backgroundColor: c.color.primaryColor,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

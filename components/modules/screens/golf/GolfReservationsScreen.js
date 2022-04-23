import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import Switch from '../../../ui/Switch';
import { STYLES as c } from '../../../../utils/constants'
import Guests from '../../../ui/Guests';

const test_data = [
	{
		'id': 1,
		'datetime': '2022-04-05T10:05:02+00:00',
		'hoyo_inicio': 'HOYO 1'
	},
	{
		'id': 2,
		'datetime': '2022-04-05T11:05:02+00:00',
		'hoyo_inicio': 'HOYO 2'
	},
	{
		'id': 3,
		'datetime': '2022-04-05T12:05:02+00:00',
		'hoyo_inicio': 'HOYO 3'
	},
	{
		'id': 4,
		'datetime': '2022-04-06T13:05:02+00:00',
		'hoyo_inicio': 'HOYO 4'
	},
	{
		'id': 5,
		'datetime': '2022-04-06T14:05:02+00:00',
		'hoyo_inicio': 'HOYO 5'
	},
	{
		'id': 6,
		'datetime': '2022-04-06T15:05:02+00:00',
		'hoyo_inicio': 'HOYO 6'
	},
	{
		'id': 7,
		'datetime': '2022-04-06T16:05:02+00:00',
		'hoyo_inicio': 'HOYO 7'
	},
	{
		'id': 8,
		'datetime': '2022-04-07T17:05:02+00:00',
		'hoyo_inicio': 'HOYO 8'
	},
	{
		'id': 9,
		'datetime': '2022-04-07T18:05:02+00:00',
		'hoyo_inicio': 'HOYO 10'
	},
	{
		'id': 10,
		'datetime': '2022-04-07T19:05:02+00:00',
		'hoyo_inicio': 'HOYO 11'
	}
];

export default function GolfReservationsScreen(props) {
	const [allReservations, setAllReservations] = useState(test_data);
	const [selectedDate, setSelectedDate] = useState(null);
	const [shownReservations, setShownReservations] = useState([]);
	const [selectedReservationId, setSelectedReservationId] = useState(null);
	const [activeModal, setActiveModal] = useState(false);
	//Invitados
	const [guest, setGuest] = useState();
    const [guests, setGuests] = useState([]);
    const maxGuests = 15;
    const [maxGuestsReached, setMaxGuests] = useState(false);

	/* Se agregan invitado a la lista unicamente si no se ha alcanzado el máximo de invitados */
    const handleAddGuests = () => {
        Keyboard.dismiss();
		if(guests.length < maxGuests){
            setGuests([...guests, guest]);
            setGuest(null);
        }else{
			Alert.alert('Máximo alcanzado', 'Ya no se pueden agregar mas invitados', [
				{text: 'Aceptar'}
			])
            //setMaxGuests(true);
        }
    }

	/* Se borran los invitados seleccionados */
	const deleteGuest = (index) => {
		let guestsCopy = [...guests];
		guestsCopy.splice(index, 1);
		setGuests(guestsCopy);
	}

    /* Se guardan los invitados en la base de datos */
    const saveGuests = () => {}

	const getCalendarOptions = data => {
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

	// When the selected Date changes, we need to update the reservations available
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

	return (
		<ScrollView>
		<ScreenContainer style={{paddingTop: 0}}>
			
			{/* Hoyos a jugar y carritos */}
			<View style={style.tableContainer}>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Hoyos a jugar:</P>
					</View>
					<View style={style.tableCol2}>
						<Switch defaultValue={true} activeText='18' inactiveText='09' />
					</View>
				</View>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Carritos rentados:</P>
					</View>
					<View style={style.tableCol2}>
							<TextInput style={style.textInput}
								keyboardType='numeric'
								onChangeText={()=> {}}
								maxLength={2}
								keyboard
								/>
					</View>
				</View>

			</View>

			<View>
				<Subtitle>Selecciona la fecha y la hora</Subtitle>

				{/* Date picker */}
				<View style={style.datePickerContainer}>
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
				</View>

				{/* Hour picker */}
				<View style={style.timePickerContainer} >
					{ shownReservations.map(i => {
						return (
							<CapsuleBtn 
								defaultActive={false}
								title={i.datetime.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}
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

			<View style={style.guestsContainer}>

				{/* Agregar invitados */}
				{/* <View>
					<ModalAddGuests openModal={activeModal} setModalOpen={setActiveModal}/>
				</View>

				<View style={style.actionBtnContainer}>
					<ActionBtn title="Añadir invitados" 
						onPress={() => setActiveModal(true)}
					/>
				</View> */}
				<View>
					<Subtitle>Agrega más asistentes</Subtitle>
                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            style={style.keyboardContainer}
                        >
                            <TextInput 
                                placeholder={'Escribe el nombre del invitado'}
                                style={style.Input}
                                value={guest}
                                onChangeText={text => setGuest(text)}/>
                            <TouchableOpacity onPress={() => handleAddGuests()} disabled={maxGuestsReached}>
                                <View style={style.addWrapper}>
                                    <P>+</P>
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
			</View>

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
		borderRadius: 100,
		width: 100,
		height: 33
	},
	keyboardContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Input: {
        backgroundColor: c.color.grey,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
    }, 
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: c.color.grey,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
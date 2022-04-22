import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';
import Switch from '../../../ui/Switch';
import { STYLES as c } from '../../../../utils/constants'


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
				<Subtitle>Agrega más asistentes</Subtitle>
				<View style={style.actionBtnContainer}>
					<ActionBtn title="Añadir invitados" />
				</View>
			</View>

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
	}
})
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
		'datetime': '2022-04-05T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-05T11:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-05T12:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-06T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-06T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-06T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-06T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-07T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-07T10:05:02+00:00'
	},
	{
		'id': 1,
		'datetime': '2022-04-07T10:05:02+00:00'
	}
];

export default function GolfReservationsScreen(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	const [allDates, setAllDates] = useState([]);


	const handleClick = () => {
		setActive(!active);
	}

	const getCalendarOptions = data => {
		const dates = [];
		const seen = new Set();
		data.forEach(row => {
			if (!seen.has(row.datetime)){
				dates.push(row);
				seen.add(row.datetime);
			}
		});
		dates.sort( (a,b) => a.year-b.year || a.month-b.month || a.day-b.day);
		return dates;
	};

	const saveReservation = () => {
		var reservation={"date_time" : date, "hour" : hour};
		var JSONreservation=JSON.stringify(reservation);
		console.log(date);
		console.log(hour);
		console.log(JSONreservation.date_time, JSONreservation.hour);
	}

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
					
					<DateOption defaultActive={false} datetime={'2022-04-20'} date='lun' day='20' value={date} onClick={() => setDate('2022-04-20')} />
					<DateOption defaultActive={false} datetime={'2022-04-20'} date='mar' day='21' value={date} onClick={() => setDate('2022-04-20')} />
					<DateOption defaultActive={false} datetime={'2022-04-22'} date='mie' day='22' value={date} onClick={() => setDate('2022-04-22')} />
				</View>

				{/* Hour picker */}
				<View style={style.timePickerContainer} >
					<CapsuleBtn defaultActive={false} title='12:00 am' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={false} title='1:00 pm' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={true} title='2:00 pm' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={false} title='3:00 pm' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={false} title='4:00 pm' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={false} title='5:30 pm' subtitle='HOYO 1' onClick={() => {}} />
					<CapsuleBtn defaultActive={false} title='10:30 pm' subtitle='HOYO 1' onClick={() => {}} />
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
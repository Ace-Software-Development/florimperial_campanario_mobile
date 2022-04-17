import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Title, ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';
import CapsuleBtn from '../../../ui/CapsuleBtn';

export default function GolfReservationsScreen(props) {
	return (
		<ScreenContainer>
			
			{/* Hoyos a jugar y carritos */}
			<View style={style.tableContainer}>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Hoyos a jugar:</P>
					</View>
					<View style={style.tableCol2}>
						<Switch style={{width: 50}} />
					</View>
				</View>

				<View style={style.tableRow}>
					<View style={style.tableCol1}>
						<P >Carritos rentados:</P>
					</View>
					<View style={style.tableCol2}>
						<Switch style={{width:50}} />
					</View>
				</View>

			</View>

			<View>
				<Subtitle>Selecciona la fecha y la hora</Subtitle>

				{/* Date picker */}
				<View style={style.datePickerContainer}>
					<DateOption defaultActive={true} datetime={'2022-04-20'} date='lun' day='20' onClick={() => {}} />
					<DateOption defaultActive={false} datetime={'2022-04-20'} date='mar' day='21' onClick={() => {}} />
					<DateOption defaultActive={false} datetime={'2022-04-22'} date='mie' day='22' onClick={() => {}} />
				</View>

				{/* Hour picker */}
				<View style={style.timePickerContainer} >
					<CapsuleBtn title='12:00 am' subtitle='HOYO 1' />
					<CapsuleBtn title='1:00 pm' subtitle='HOYO 1' />
					<CapsuleBtn title='2:00 pm' subtitle='HOYO 1' />
					<CapsuleBtn title='3:00 pm' subtitle='HOYO 1' />
					<CapsuleBtn title='4:00 pm' subtitle='HOYO 1' />
					<CapsuleBtn title='5:30 pm' subtitle='HOYO 1' />
					<CapsuleBtn title='10:30 pm' subtitle='HOYO 1' />
				</View>

			</View>

		</ScreenContainer>
	);
}

const style = StyleSheet.create({
	tableContainer: {
		flex: 5,
		justifyContent: 'flex-start',
		maxHeight: '25%'
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
		marginTop: 10
	},

	timePickerContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginTop: 10
	}
})
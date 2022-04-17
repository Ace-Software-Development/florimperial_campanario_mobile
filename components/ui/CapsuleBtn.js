import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { STYLES as c } from '../../utils/constants';


export default function CapsuleBtn(props) {
	return (
		<View style={style.container}>
			<Text style={style.title}>{props.title}</Text>
			<Text style={style.subtitle}>{props.subtitle}</Text>
		</View>
	);
}

const style = StyleSheet.create({
	container : {
		borderWidth: 1.5,
		borderColor: c.color.primaryColor,
		borderRadius: 100,
		width: 107,
		paddingTop: 8,
		paddingBottom: 7,
		paddingHorizontal: 10,
		marginHorizontal: 5,
		marginBottom: 10,
		alignItems: 'center',
	},
	
	title: {
		fontSize: 16,
		color: c.color.primaryColor
	},

	subtitle: {
		fontSize: 12,
		color: c.color.darkGrey
	}
});

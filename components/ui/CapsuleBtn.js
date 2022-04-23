import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';


export default function CapsuleBtn(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	let statusContainerStyle = active ? style.containerActive : style.containerInactive;
	let statusTitleStyle = active ? style.titleActive : style.titleInactive;
	let statusSubTitleStyle = active ? style.subtitleActive : style.subtitleInactive;

	// When the selectedReservation is modified in the parent component
	useEffect(() => {
		setActive( props.selectedReservationId === props.value );
	}, [props.selectedReservationId]);
	
	// When this component changes the Active state
	useEffect(() => {
		if (active)
			props.onClick(props.value);
		statusContainerStyle = active ? style.containerActive : style.containerInactive;
		statusTitleStyle = active ? style.titleActive : style.titleInactive;
		statusSubTitleStyle = active ? style.subtitleActive : style.subtitleInactive;
	}, [active]);

	return (
		<TouchableOpacity style={[style.container, statusContainerStyle]} onPress={() => setActive(!active)}>
			<Text style={[style.title, statusTitleStyle]}>{props.title}</Text>
			<Text style={[style.subtitle, statusSubTitleStyle]}>{props.subtitle}</Text>
		</TouchableOpacity>
	);
}


const style = StyleSheet.create({
	container : {
		borderWidth: 1.5,
		borderColor: c.color.primaryColor,
		borderRadius: 100,
		width: '29%',
		paddingTop: 8,
		paddingBottom: 7,
		paddingHorizontal: 10,
		marginHorizontal: 5,
		marginBottom: 10,
		alignItems: 'center',
	},
	
	title: {
		fontSize: RFPercentage(2),
	},

	subtitle: {
		fontSize: RFPercentage(1.4),
		color: c.color.darkGrey
	},

	containerActive: {
		backgroundColor: c.color.primaryColor
	},

	containerInactive: {
		backgroundColor: null
	},

	titleActive: {
		color: 'white'
	},

	titleInactive: {
		color: c.color.primaryColor
	},

	subtitleActive: {
		color: c.color.grey
	},
	
	subtitleInactive: {
		color: c.color.darkGrey
	}
});

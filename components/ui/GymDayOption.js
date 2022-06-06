import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';


export default function GymDayOption(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	let statusContainerStyle = active ? style.containerActive : style.containerInactive;
	let statusTitleStyle = active ? style.titleActive : style.titleInactive;

	// When the selectedRoutine is modified in the parent component
	useEffect(() => {
		setActive( props.selectedRoutineId === props.value );
	}, [props.selectedRoutineId]);
	
	// When this component changes the Active state
	useEffect(() => {
		if (active)
			props.onClick(props.value);
		else if (props.selectedRoutineId === props.value)
			props.setSelectedRoutineId(null);
			
		statusContainerStyle = active ? style.containerActive : style.containerInactive;
		statusTitleStyle = active ? style.titleActive : style.titleInactive;
	}, [active]);

	return (
		<TouchableOpacity style={[style.container, statusContainerStyle]} onPress={() => setActive(!active)}>
			<Text style={[style.title, statusTitleStyle]}>{props.title}</Text>
		</TouchableOpacity>
	);
}


const style = StyleSheet.create({
	container : {
		borderWidth: 1.5,
		borderColor: c.color.primaryColor,
		borderRadius: 100,
		width: 100,
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
	}

});

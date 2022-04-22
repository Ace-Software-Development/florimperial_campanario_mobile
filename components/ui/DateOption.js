import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { STYLES as c } from '../../utils/constants';


export default function DateOption(props) {
	const [active, setActive] = useState('active' in props ? props.active : false);
	let statusContainerStyle = active ? styles.containerActive : styles.containerInactive;
	let statusTitleStyle = active ? styles.titleActive : styles.titleInactive;

	const dayMapping = [
		'DOM', 'LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'
	];

	// When the selectedDate is modified in the parent
	useEffect(()=> {
		setActive( props.selectedDate === props.datetime );
	}, [props.selectedDate]);

	// When the users clicks this component
	const handleClick = () => {
		setActive(!active);
	}

	// When 
	useEffect(() => {
		if (active)
			props.onClick(props.datetime);
		statusContainerStyle = active ? styles.containerActive : styles.containerInactive;
		statusTitleStyle = active ? styles.titleActive : styles.titleInactive;
	} , [active]);

	return (
		<TouchableOpacity style={[styles.container, statusContainerStyle]} onPress={handleClick}>
			<Text style={[styles.day, statusTitleStyle]} >{dayMapping[props.day]}</Text>
			<Text style={[styles.date, statusTitleStyle]} >{props.date}</Text>
		</TouchableOpacity>
	);
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
		padding: 5,
		marginRight: 15,
		borderRadius: 10
	},

	containerInactive: {
		backgroundColor: c.color.grey,
	},

	containerActive: {
		backgroundColor: c.color.primaryColor,
	},

	titleInactive: {
		color: c.color.primaryColor,
	},

	titleActive: {
		color: 'white'
	},

	day: {
		fontSize: 20,
		color: c.color.primaryColor,
		textTransform: 'uppercase',
		includeFontPadding: false
	},

	date: {
		fontSize: 38,
		color: c.color.primaryColor,
		includeFontPadding: false
	}
})

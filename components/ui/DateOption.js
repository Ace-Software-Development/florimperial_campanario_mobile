import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { STYLES as c } from '../../utils/constants';


export default function DateOption(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	let statusContainerStyle = active ? styles.containerActive : styles.containerInactive;
	let statusTitleStyle = active ? styles.titleActive : styles.titleInactive;

	const handleClick = () => {
		setActive(!active);
	}

	useEffect(() => {
		props.onClick(active, props.datetime);
		statusContainerStyle = active ? styles.containerActive : styles.containerInactive;
		statusTitleStyle = active ? styles.titleActive : styles.titleInactive;
	} , [active]);



	return (
		<TouchableOpacity style={[styles.container, statusContainerStyle]} onClick={handleClick}>
			<Text style={[styles.date, statusTitleStyle]} >{props.date}</Text>
			<Text style={[styles.day, statusTitleStyle]} >{props.day}</Text>
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

	date: {
		fontSize: 20,
		color: c.color.primaryColor,
		textTransform: 'uppercase',
		includeFontPadding: false
	},

	day: {
		fontSize: 38,
		color: c.color.primaryColor,
		includeFontPadding: false
	}
})

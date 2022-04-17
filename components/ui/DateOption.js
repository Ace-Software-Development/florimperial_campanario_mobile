import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { STYLES as c } from '../../utils/constants';


export default function DateOption(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	let statusStyle = active ? styles.containerActive : styles.containerInactive;

	const handleClick = () => {
		setActive(!active);
	}

	useEffect(() => {
		props.onClick(active, props.datetime);
		statusStyle = active ? styles.containerActive : styles.containerInactive;
	} , [active]);



	return (
		<TouchableOpacity style={[styles.container, statusStyle]} onClick={handleClick}>
			<Text style={styles.date} >{props.date}</Text>
			<Text style={styles.day} >{props.day}</Text>
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
		color: c.color.primaryColor
	},

	containerActive: {
		backgroundColor: c.color.primaryColor,
		color: 'white'
	},

	

	date: {
		fontSize: 20,
		color: c.color.primaryColor,
		textTransform: 'uppercase',
	},

	day: {
		fontSize: 38,
		color: c.color.primaryColor,
	}
})

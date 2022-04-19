import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { STYLES as c } from '../../utils/constants';


export default function CapsuleBtn(props) {
	const [active, setActive] = useState('defaultActive' in props ? props.defaultActive : false);
	let statusContainerStyle = active ? style.containerActive : style.containerInactive;
	let statusTitleStyle = active ? style.titleActive : style.titleInactive;
	let statusSubTitleStyle = active ? style.subtitleActive : style.subtitleInactive;
	

	const handleClick = () => {
		setActive(!active);
	}

	useEffect(() => {
		props.onClick(active, props.datetime);
		statusContainerStyle = active ? style.containerActive : style.containerInactive;
		statusTitleStyle = active ? style.titleActive : style.titleInactive;
		statusSubTitleStyle = active ? style.subtitleActive : style.subtitleInactive;
	}, [active]);

	return (
		<TouchableOpacity style={[style.container, statusContainerStyle]} onClick={handleClick}>
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
	},

	subtitle: {
		fontSize: 12,
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

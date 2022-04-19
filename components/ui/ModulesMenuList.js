import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { P } from './CampanarioComponents';
import { STYLES as c } from '../../utils/constants';
import arrowIcon from '../../assets/icons/arrow1.png';

export function ModulesMenuList(props) {
	const testData = [
		'Horarios y reservaciones',
		'Clases personalizadas',
		'Tee de práctica',
	];
	return (
		<View style={styles.menuContainer}>
			{ props.children }
		</View>
	);
}

export function ModulesMenuListItem(props) {
	return (
		<TouchableOpacity 
			style={styles.listItem}
			onPress={props.onPress}
		>
			<View style={styles.listItemIcon}></View>
			<P style={styles.listItemTitle}>{props.title}</P>
			<Image source={arrowIcon} style={styles.arrowIcon} />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	menuContainer: {
		backgroundColor: 'white',
		borderRadius: 15,
		width: '100%',
		justifyContent: 'space-evenly',
		paddingVertical: 10,
	},

	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		padding: 10
	},

	listItemIcon: {
		marginHorizontal: 15,
		width: 40,
		height: 40,
		backgroundColor: 'grey',
		borderRadius: 5
	},

	listItemTitle: {
	},

	arrowIcon: {
		height: 20,
		width: 10,
		position: 'absolute',
		right: 15,
	}
})
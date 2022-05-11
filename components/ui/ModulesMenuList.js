import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { P } from './CampanarioComponents';
import { STYLES as c } from '../../utils/constants';
import ArrowIcon from '../../assets/icons/arrow1-icon.svg';

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
			{ props.children }
			<P style={styles.listItemTitle}>{props.title}</P>
			<ArrowIcon width={15} height={15} style={styles.arrowIcon} />
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
		paddingLeft: 10
	},

	listItem: {
		flexDirection: 'row',
		alignItems: 'center',
		position: 'relative',
		padding: 10
	},

	listItemTitle: {
		marginLeft: 12
	},

	arrowIcon: {
		position: 'absolute',
		right: 15,
	}
})
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { STYLES as c } from '../../utils/constants';

export function Title(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.primaryColor,
		...props.style
	};
	return (
		<Text style={[defaultStyles.title, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function Subtitle(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.darkGrey,
		...props.style
	};
	return (
		<Text style={[defaultStyles.subtitle, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function P(props) {
	const localStyles = {
		color: 'color' in props && props.color == 'light' ? c.color.lightBg : c.color.darkGrey,
		...props.style
	};

	if ('size' in props)
		localStyles.fontSize = props.size === 'small' ? 16 : 20

	return (
		<Text style={[defaultStyles.p, localStyles]}>
			{ props.children }
		</Text>
	);
}

export function Btn(props) {
	const localStyles = {};
	return (
		<TouchableOpacity onPress={props.onPress} style={[defaultStyles.actionBtnContainer, localStyles]}>
			{ props.children }
		</TouchableOpacity>
	);
}

export function ActionBtn(props) {
	const textLocalStyles = {};
	const containerLocalStyles = {};
	return (
		<TouchableOpacity onPress={props.onPress} style={[defaultStyles.actionBtnContainer, containerLocalStyles]}>
			<Text style={[defaultStyles.actionBtnText, textLocalStyles]}>
				{ props.title }
			</Text>
		</TouchableOpacity>
	);
}


const defaultStyles = StyleSheet.create({
	
	title: {
		color: c.color.primaryColor,
		fontSize: 24,
		fontWeight: 'bold',
	},

	subtitle: {
		color: c.color.darkGrey,
		fontSize: 20,
		fontWeight: 'bold'
	},

	p: {
		color: c.color.darkGrey,
		fontSize: 18,
		fontWeight: 'normal'
	},

	actionBtnContainer: {
		backgroundColor: c.color.grey,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12
	},
	
	actionBtnText: {
		color: c.color.primaryColor,
		fontSize: 18,
		fontWeight: 'bold',
		alignSelf: 'center'
	}
});

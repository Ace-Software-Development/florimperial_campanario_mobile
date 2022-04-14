import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Title, P, Subtitle } from '../../../ui/CampanarioComponents';

export default function GolfMenuScreen(props) {
	return (
		<View style={style.container}>
			<View>
				<P>Módulo de golf</P>
			</View>
		</View>
	);
}

const style = StyleSheet.create({
	container: {
	  flex: 1,  
	  paddingTop: 60, 
	  paddingHorizontal: 25
	},

});
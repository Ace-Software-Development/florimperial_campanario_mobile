import React, { useState, useEffect } from  'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';


export default function Poster(props){
	const [height, setHeight] = useState('85%');

	const onLayout = event => {
		const {x, y, h, w} = event.nativeEvent.layout;
	};
	console.log('hola', onLayout);

	useEffect(() => {
		Image.getSize(props.source, (w, h) => {
			setHeight(h);
		});
	}, []);

	return (
		<View onPress={props.onPress} style={styles.container}>
			<Image style={[styles.cardImgBg, {height:height}]} source={{uri: props.source}} />
			<Text style={styles.cardTimestamp}>{ props.timeTitle }</Text>
		</View>	
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: 'red',
	},

	cardImgBg: {
		marginVertical: 10,
		resizeMode: 'contain',
		borderRadius: 10,
		width: '100%',
	},	

	cardTimestamp: {
		fontSize: RFPercentage(1.7),
		color: c.color.darkGrey,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#EBEBEBBB',
		width: 100,
		height: 29,
		borderRadius: 10,
		position: 'absolute',
		right: 5,
		marginHorizontal: 10,
		marginTop: 10
	}
});
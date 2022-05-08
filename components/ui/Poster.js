import React, { useState, useEffect } from  'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';


export default function Poster(props){
	const [imgSize, setImgSize] = useState([]);
	const [containerSize, setContainerSize] = useState([]);

	// Get the size of the image
	Image.getSize(props.source, (w, h) => {
		console.log('Get image size', w, h);
		setImgSize([w, h]);
	});
	
	const getLayoutSize = event => {
		console.log(event.layout);
		const {x, y, w, h} = event.layout;
		console.log('Layout size', w, h);
		const new_ratio = w / imgSize[0];
		const new_height =  imgSize[1]  * new_ratio;
		console.log('New size of img', imgSize[0], new_height);
		if (new_height != imgSize[1])
			setImgSize([imgSize[0], new_height]);
	};


	return (
		<View onLayout={event => getLayoutSize(event) } onPress={props.onPress} style={styles.container}>
			<Image style={[styles.cardImgBg, {height:imgSize[1]}]} source={{uri: props.source}} />
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
		width: '100%'
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
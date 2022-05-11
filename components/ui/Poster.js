import React from  'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import { STYLES as c } from '../../utils/constants';


export default function Poster(props) {
	return (
		//{ Image.getSize(props.source, (width, height) => {} ) }
		<View onPress={props.onPress} style={[styles.container, props.style]}>
			<ImageBackground  style={[styles.cardImgBg]} source={{uri: props.source}} imageStyle={styles.imgStyle}>
				<Text style={styles.cardTimestamp} blurRadius={10}>{ props.timeTitle }</Text>
			</ImageBackground >
		</View>	
	);
}

const styles = StyleSheet.create({
	cardImgBg: {
		resizeMode: 'contain',
		width: undefined,
		height: undefined,
		aspectRatio: .67
	},	

	cardTimestamp: {
		fontSize: RFPercentage(1.8),
		color: c.color.darkGrey,
		fontWeight: 'bold',
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#EBEBEBBB',
		width: 100,
		height: 29,
		borderRadius: 20,
		position: 'absolute',
		right: 5,
		marginHorizontal: 10,
		marginTop: 10
	},

	imgStyle: {
		borderRadius: 20,
		
	}
});
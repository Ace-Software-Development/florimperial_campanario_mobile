import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { Title, Subtitle, P, ActionBtn, Btn } from '../../ui/CampanarioComponents';
import perfilIMG from '../../../assets/img/perfilIMG.png'
import golfIMG from '../../../assets/img/golfIMG.png'
import Navigation from '../../core/Navigation';
import { useNavigation } from '@react-navigation/native';

export default function ModulesScreen(props) {
	const navigation = useNavigation();
	return (
	<View style={style.container}>
		<View style={{width: "100%", height: 50}}>
		<Title>Módulos</Title>
		<Image style={style.perfilIMG} source={perfilIMG}/>
		</View>
		<View>
		<TouchableOpacity
			onPress = {() => {
				navigation.navigate('golf_module')
			}}>
			<ImageBackground style={style.modulo} source={golfIMG} imageStyle={{ borderRadius: 10}}>
			<Text style={style.textoModulo}>Golf</Text>
			</ImageBackground>
		</TouchableOpacity>
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
	modulo: {
		marginVertical: 10,
		resizeMode: 'contain',
		height: 200,
		width: "100%"
	},
	textoModulo: {
		marginHorizontal: 20,
		fontSize: 27,
		fontWeight: 'bold', 
		color: `white`,
		position: 'absolute',
		bottom: 13
	},
	perfilIMG: {
		resizeMode: "contain",
		width: 25,
		height: 22,
		position: 'absolute',
		right: 2,
		marginTop: 6
	}
});
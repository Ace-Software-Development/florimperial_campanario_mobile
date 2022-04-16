import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Title, Subtitle, P, ActionBtn } from '../../../ui/CampanarioComponents';
import golfIMG from '../../../../assets/img/golfIMG.png'
import gymIMG from '../../../../assets/img/gymIMG.jpeg'
import kidsclubIMG from '../../../../assets/img/kidsclubIMG.jpg'
import perfilIMG from '../../../../assets/img/perfilIMG.png'

export default function NewsletterHomeScreen(props) {
	return (
	<View style={style.container}>
		<View style={{width: "100%", height: 50}}>
		<Title style={style.title}>Anuncios</Title>
		<Image style={style.perfilIMG} source={perfilIMG}/>
		</View>
		<View>
		<ImageBackground style={style.anuncio} source={golfIMG} imageStyle={{ borderRadius: 10}}>
			<Text style={style.tiempoAnuncio}>Hace 3 días</Text>
			<Text style={style.textoAnuncio}>Verano Campanario</Text>
		</ImageBackground>

		<ImageBackground style={style.anuncio} source={gymIMG} imageStyle={{ borderRadius: 10}}>
			<Text style={style.tiempoAnuncio}>Hace 3 días</Text>
			<Text style={style.textoAnuncio}>GYM & Fitness</Text>
		</ImageBackground>

		<ImageBackground style={style.anuncio} source={kidsclubIMG} imageStyle={{ borderRadius: 10}}>
			<Text style={style.tiempoAnuncio}>Hace 3 días</Text>
			<Text style={style.textoAnuncio}>Kid's Club</Text>
		</ImageBackground>
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
	anuncio: {
		marginVertical: 10,
		resizeMode: 'contain',
		height: 200,
		width: "100%"
	},
	textoAnuncio: {
		marginHorizontal: 20,
		fontSize: 22,
		fontWeight: 'bold', 
		color: `white`,
		position: 'absolute',
		bottom: 13
	},
	tiempoAnuncio: {
		fontSize: 11,
		textAlign: 'center',
		textAlignVertical: 'center',
		backgroundColor: '#EBEBEB',
		width: 90,
		height: 26,
		borderRadius: 10,
		position: 'absolute',
		right: 5,
		marginHorizontal: 10,
		marginTop: 10
	},
	perfilIMG: {
		resizeMode: "contain",
		width: 29,
		height: 27,
		position: 'absolute',
		right: 2,
		marginTop: 3
	}
	});
  
/*const styles = StyleSheet.create({
container: {
	flex: 1,
	backgroundColor: '#fff',
	alignItems: 'center',
	justifyContent: 'center',
},
});*/
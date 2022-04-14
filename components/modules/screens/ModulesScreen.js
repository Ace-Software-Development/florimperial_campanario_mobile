import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground  } from 'react-native';
import perfilIMG from '../../../assets/img/perfilIMG.png'
import golfIMG from '../../../assets/img/golfIMG.png'

export default function ModulesScreen(props) {
	return (
	<View style={style.container}>
      <View style={{width: "100%", height: 50}}>
        <Text style={style.title}>Módulos</Text>
        <Image style={style.perfilIMG} source={perfilIMG}/>
      </View>
      <View>
        <ImageBackground style={style.modulo} source={golfIMG} imageStyle={{ borderRadius: 10}}>
          <Text style={style.textoModulo}>Golf</Text>
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
	title: {
	  fontSize: 22,
	  fontWeight: 'bold', 
	  color: `#2B4066`
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
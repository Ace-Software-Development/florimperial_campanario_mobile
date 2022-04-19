import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Title } from '../ui/CampanarioComponents';
import perfilIMG from '../../assets/img/perfilIMG.png'


export default function TopNav(props) {
	return (
		<View style={styles.container}>
			<Title>{props.title}</Title>
			<Image style={styles.perfilImg} source={perfilIMG}/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%", 
		height: 50
	},

	perfilImg: {
		resizeMode: "contain",
		width: 29,
		height: 27,
		position: 'absolute',
		right: 2,
		marginTop: 3
	}
})
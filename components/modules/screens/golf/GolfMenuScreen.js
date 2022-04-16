import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { P } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';


export default function GolfMenuScreen(props) {
	const navigation = useNavigation();
	return (
		<View style={style.container}>
			<ModulesMenuList>
				<ModulesMenuListItem title="Horarios y reservaciones" onPress={() => navigation.navigate('golf_reservations')} />
				<ModulesMenuListItem title="Clases grupales" onPress={() => {}} />
				<ModulesMenuListItem title="Tee de práctica" onPress={() => {}} />
			</ModulesMenuList>
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
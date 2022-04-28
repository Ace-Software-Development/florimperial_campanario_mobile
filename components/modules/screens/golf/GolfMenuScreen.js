import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';


export default function GolfMenuScreen(props) {
	const navigation = useNavigation();
	return (
		<ScreenContainer>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Horarios y reservaciones" onPress={() => navigation.navigate('golf_reservations')} />
					<ModulesMenuListItem title="Clases grupales" onPress={() => {}} />
					<ModulesMenuListItem title="Tee de práctica" onPress={() => navigation.navigate('golf_tee')} />
				</ModulesMenuList>
			</View>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reglamentos</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reglamento general" onPress={() => navigation.navigate('golf_reservations')} />
				</ModulesMenuList>
			</View>
			
		</ScreenContainer>
	);
}

const style = StyleSheet.create({
	container: {
		marginBottom: 40
	}
});
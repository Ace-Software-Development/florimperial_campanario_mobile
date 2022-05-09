import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity  } from 'react-native';
import { ScreenContainer, ModuleCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import golfIMG from '../../../assets/img/golfIMG.png'
import { useNavigation } from '@react-navigation/native';

export default function ModulesScreen(props) {
	const navigation = useNavigation();
	return (
		<ScreenContainer>
			<TopNav title='Módulos' />

			<View>

				<ModuleCard  
					title='Golf'
					source={golfIMG}
					onPress={() => navigation.navigate('golf_module')}
				/>

			</View>

		</ScreenContainer>
	);
}

import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, ScrollView  } from 'react-native';
import { ScreenContainer, ModuleCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import golfIMG from '../../../assets/img/golfIMG.png';
import gymIMG from '../../../assets/img/gymIMG.jpeg';
import raquetaIMG from '../../../assets/img/raquetaIMG.jpg';
import poolIMG from '../../../assets/img/poolIMG.jpg';
import salonesIMG from '../../../assets/img/salonesIMG.jpg';
import { useNavigation } from '@react-navigation/native';

export default function ModulesScreen(props) {
	const navigation = useNavigation();
	return (
		<ScreenContainer>
			<TopNav title='Módulos' />
			<ScrollView>

				<ModuleCard  
					title='Golf'
					source={golfIMG}
					onPress={() => navigation.navigate('golf_module')}
				/>

				<ModuleCard  
					title='Gimnasio'
					source={gymIMG}
					onPress={() => navigation.navigate('gym_module')}
				/>

				<ModuleCard  
					title='Raqueta'
					source={raquetaIMG}
					onPress={() => navigation.navigate('raqueta_module')}
				/>

				<ModuleCard  
					title='Alberca'
					source={poolIMG}
					onPress={() => navigation.navigate('pool_module')}
				/>

				<ModuleCard  
					title='Salones'
					source={salonesIMG}
					onPress={() => navigation.navigate('salones_module')}
				/>
			</ScrollView>
		</ScreenContainer>
	);
}

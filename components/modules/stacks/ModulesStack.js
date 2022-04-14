import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ModulesScreen from '../screens/ModulesScreen';
import { Title } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';

const ModulesStackNavigator = createNativeStackNavigator();

export default function NewsletterStack(props) {
	return (
		<ModulesStackNavigator.Navigator
			initialRouteName='module_main'
		>
			<ModulesStackNavigator.Screen 
				name='module_main'
				component={ModulesScreen}
				options={{
					headerShown: false,
				}}
			/>
			<ModulesStackNavigator.Screen 
				name='golf_module'
				component={GolfMenuScreen}
				options={{
					headerShown: false,
				}}
			/>
		</ModulesStackNavigator.Navigator>
	);
}

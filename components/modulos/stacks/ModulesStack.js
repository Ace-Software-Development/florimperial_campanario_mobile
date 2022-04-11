import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ModulesScreen from '../screens/ModulesScreen';

const ModulesStackNavigator = createNativeStackNavigator();

export default function NewsletterStack(props) {
	return (
		<ModulesStackNavigator.Navigator
			initialRouteName=''
		>
			<ModulesStackNavigator.Screen 
				name='main'
				component={ModulesScreen}
				options={{
					headerShown: false,
				}}
			/>
		</ModulesStackNavigator.Navigator>
	);
}

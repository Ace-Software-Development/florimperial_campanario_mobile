import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModulesScreen from '../screens/ModulesScreen';
import { Title } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';
import GolfReservationsScreen from '../screens/golf/GolfReservationsScreen';
import GolfTeeScreen from '../screens/golf/GolfTeeScreen';
//import { SimpleBtn } from '../../ui/Btn';

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
					title: 'Golf',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			{/* TODO: Pass these component to a Golf Stack */}
			<ModulesStackNavigator.Screen 
				name='golf_reservations'
				component={GolfReservationsScreen}
				options={{
					title: 'Reservaciones Golf',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
					//headerRight: () => (
					//	<SimpleBtn title="Guardar" />
					//)
				}}
			/>

			<ModulesStackNavigator.Screen 
				name='golf_tee'
				component={GolfTeeScreen}
				options={{
					title: 'Tee de práctica',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>
		</ModulesStackNavigator.Navigator>
	);
}

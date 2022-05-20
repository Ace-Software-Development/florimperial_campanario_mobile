import React, { useState, useEffect, useContext } from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModulesScreen from '../screens/ModulesScreen';
import { Title } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';
import GolfReservationsScreen from '../screens/golf/GolfReservationsScreen';
import GolfTeeScreen from '../screens/golf/GolfTeeScreen';
import GolfRegulationsScreen from '../screens/golf/GolfRegulationsScreen';
import GolfClassesScreen from '../screens/golf/GolfClassesScreen';
import GymMenuScreen from '../screens/gym/GymMenuScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import GymReservationsScreen from '../screens/gym/GymReservationsScreen';
import { reservationMadeContext } from '../../../utils/context';

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

			{/* Golf Stack */}
			<ModulesStackNavigator.Screen 
				name='golf_reservations'
				component={ReservationsScreen}
				initialParams={{
					module: 'golf',
					showGuests: true
				}}
				options={{
					title: 'Horarios y Reservaciones',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen
				name='golf_classes_reservations'
				component={GolfClassesScreen}
				options={{
					title: 'Clases personalizadas Golf',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
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
			
			<ModulesStackNavigator.Screen 
				name='golf_regulations'
				component={GolfRegulationsScreen}
				options={{
					title: 'Reglamento Golf',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			{/* Gym Stack */}
			<ModulesStackNavigator.Screen
				name='gym_module'
				component={GymMenuScreen}
				options={{
					title: 'Gimnasio',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>
			
			<ModulesStackNavigator.Screen 
				name='gym_reservations'
				component={ReservationsScreen}
				initialParams={{
					module: 'gym',
					showGuests: false
				}}
				options={{
					title: 'Reservaciones Gimnasio',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

		</ModulesStackNavigator.Navigator>
	);
}

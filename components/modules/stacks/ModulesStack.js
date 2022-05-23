import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModulesScreen from '../screens/ModulesScreen';
import { Title } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';
import GolfRegulationsScreen from '../screens/golf/GolfRegulationsScreen';
import GymMenuScreen from '../screens/gym/GymMenuScreen';
import RaquetaMenuScreen from '../screens/raqueta/RaquetaMenuScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import ClassesReservationsScreen from '../screens/ClassesReservationsScreen';

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
				component={ClassesReservationsScreen}
				initialParams={{
					module: 'golf',
					showGuests: true
				}}
				options={{
					title: 'Clases Personalizadas Golf',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen 
				name='golf_tee'
				component={ReservationsScreen}
				initialParams={{
					module: 'golf_tee',
					showGuests: true
				}}
				options={{
					title: 'Tee de Práctica',
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

			<ModulesStackNavigator.Screen
				name='gym_classes_reservations'
				component={ClassesReservationsScreen}
				initialParams={{
					module: 'gym',
					showGuests: false
				}}
				options={{
					title: 'Clases Personalizadas Gimnasio',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			{/* Raqueta Stack */}
			<ModulesStackNavigator.Screen
				name='raqueta_module'
				component={RaquetaMenuScreen}
				options={{
					title: 'Raqueta',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			<ModulesStackNavigator.Screen
				name='raqueta_reservations'
				component={ReservationsScreen}
				initialParams={{
					module: 'raqueta',
					showGuests: true
				}}
				options={{
					title: 'Reservaciones Raqueta',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen
				name='raqueta_classes_reservations'
				component={ClassesReservationsScreen}
				initialParams={{
					module: 'raqueta',
					showGuests: true
				}}
				options={{
					title: 'Clases Personalizadas Raqueta',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

		</ModulesStackNavigator.Navigator>
	);
}

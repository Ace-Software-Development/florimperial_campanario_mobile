import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModulesScreen from '../screens/ModulesScreen';
import { Title } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';
import RegulationsScreen from '../screens/RegulationsScreen';
import GymMenuScreen from '../screens/gym/GymMenuScreen';
import GymRoutinesScreen from '../screens/gym/GymRoutinesScreen';
import { reservationMadeContext } from '../../../utils/context';
import RaquetaMenuScreen from '../screens/raqueta/RaquetaMenuScreen';
import PoolMenuScreen from '../screens/pool/PoolMenuScreen';
import ReservationsScreen from '../screens/ReservationsScreen';
import ClassesReservationsScreen from '../screens/ClassesReservationsScreen';
import SalonesMenuScreen from '../screens/salones/SalonesMenuScreen';
import SuggetionsScreen from '../screens/SuggestionsScreen';


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
					title: 'Tee de Pr??ctica',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>
			
			<ModulesStackNavigator.Screen 
				name='golf_regulations'
				component={RegulationsScreen}
				initialParams={{
					module: 'Golf'
				}}
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

			<ModulesStackNavigator.Screen 
				name='gym_routines'
				component={GymRoutinesScreen}
				options={{
					title: 'Rutinas',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen 
				name='gym_regulations'
				component={RegulationsScreen}
				initialParams={{
					module: 'Gimnasio'
				}}
				options={{
					title: 'Reglamento Gimnasio',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
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

			<ModulesStackNavigator.Screen 
				name='racket_regulations'
				component={RegulationsScreen}
				initialParams={{
					module: 'Raqueta'
				}}
				options={{
					title: 'Reglamento Raqueta',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			{/* Pool stack */}
			<ModulesStackNavigator.Screen
				name='pool_module'
				component={PoolMenuScreen}
				options={{
					title: 'Alberca',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			<ModulesStackNavigator.Screen
				name='pool_reservations'
				component={ReservationsScreen}
				initialParams={{
					module: 'pool',
					showGuests: false
				}}
				options={{
					title: 'Reservaciones Alberca',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen 
				name='pool_regulations'
				component={RegulationsScreen}
				initialParams={{
					module: 'Alberca'
				}}
				options={{
					title: 'Reglamento Alberca',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			{/* Salones stack */}
			<ModulesStackNavigator.Screen
				name='salones_module'
				component={SalonesMenuScreen}
				options={{
					title: 'Salones',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
				}}
			/>

			<ModulesStackNavigator.Screen
				name='salones_reservations'
				component={ReservationsScreen}
				initialParams={{
					module: 'salones',
					showGuests: false
				}}
				options={{
					title: 'Reservaciones Salones',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

			<ModulesStackNavigator.Screen 
				name='suggestions'
				component={SuggetionsScreen}
				options={{
					title: 'Nueva Sugerencia',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>

		</ModulesStackNavigator.Navigator>
	);
}

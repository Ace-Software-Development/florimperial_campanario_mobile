import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ModulesScreen from '../screens/ModulesScreen';
import { Title, P } from '../../ui/CampanarioComponents';
import GolfMenuScreen from '../screens/golf/GolfMenuScreen';
import GolfReservationsScreen from '../screens/golf/GolfReservationsScreen';
import { TouchableOpacity } from 'react-native';

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

			<ModulesStackNavigator.Screen 
				name='golf_reservations'
				component={GolfReservationsScreen}
				options={{
					title: 'Golf Reservaciones',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true,
					headerRight: () => (
						<TouchableOpacity
							onPress={() => {}}>
							<P>Guardar</P>
						</TouchableOpacity>
					)
				}}
			/>
		</ModulesStackNavigator.Navigator>
	);
}

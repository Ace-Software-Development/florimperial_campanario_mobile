import React from 'react';
import { Title } from '../../ui/CampanarioComponents';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import MyReservationsScreen from '../screens/MyReservationsScreen';
import SuggetionsScreen from '../screens/SuggestionsScreen';

const MyReservationsStackNavigator = createNativeStackNavigator();

export default function NewsletterStack(props) {
	return (
		<MyReservationsStackNavigator.Navigator
			initialRouteName='my_reservations'
		>
			<MyReservationsStackNavigator.Screen 
				name='my_reservations'
				component={MyReservationsScreen}
				options={{
					headerShown: false,
				}}
			/>
			<MyReservationsStackNavigator.Screen 
				name='suggestions'
				component={SuggetionsScreen}
				options={{
                    title: 'Nueva Sugerencia',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>
		</MyReservationsStackNavigator.Navigator>
	);
}

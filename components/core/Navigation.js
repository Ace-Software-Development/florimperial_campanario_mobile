import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { STYLES as styles } from '../../utils/constants';

// Screens
import NewsletterStack from '../modules/stacks/NewsletterStack';
import ModulesStack from '../modules/stacks/ModulesStack';
import MyReservationsScreen from '../modules/screens/MyReservationsScreen';

const TAB = createBottomTabNavigator();

export default function Navigation() {
	return (
		<NavigationContainer>
			<TAB.Navigator
				initialRouteName="newsletter"
				screenOptions={{
					tabBarActiveTintColor: styles.color.contrastColor
				}}
			>
				<TAB.Screen name="newsletter"
							component={NewsletterStack}
							options={{
								tabBarLabel: 'Anuncios',
								headerShown: false,
								tabBarIcon: ({ color, size}) => {
									// Here goes an icon component
								}
							}}
				/>
				<TAB.Screen name="modules"
							component={ModulesStack} 
							options={{
								tabBarLabel: 'Módulos',
								headerShown: false,
								tabBarIcon: ({ color, size}) => {
									// Here goes an icon component
								}
							}}
				/>
				<TAB.Screen name="myreservations" 
							component={MyReservationsScreen}
							options={{
								tabBarLabel: 'Mis Reservaciones',
								headerShown: false,
								tabBarIcon: ({ color, size}) => {
									// Here goes an icon component
								}
							}}
				/>
			</TAB.Navigator>
		</NavigationContainer>
	);
}
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NewsDinamicIcon, ModulesDinamicIcon, TicketDinamicIcon} from '../ui/DynamicIcons';
import { STYLES as styles } from '../../utils/constants';

// Screens
import NewsletterStack from '../modules/stacks/NewsletterStack';
import ModulesStack from '../modules/stacks/ModulesStack';
import MyReservationsScreen from '../modules/screens/MyReservationsScreen';

const TAB = createBottomTabNavigator();

export default MainNavigation = () => {
	return (
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
								tabBarIcon: ({ focused, color, size }) => {
									if (focused)
										color = styles.color.contrastColor;
									else
										color = styles.color.primaryColor;
									return (
										<NewsDinamicIcon color={color} />
									);
											
								}
							}}
				/>
				<TAB.Screen name="modules"
							component={ModulesStack} 
							options={{
								tabBarLabel: 'Módulos',
								headerShown: false,
								tabBarIcon: ({ focused, color, size }) => {
									if (focused)
										color = styles.color.contrastColor;
									else
										color = styles.color.primaryColor;
									return (
										<ModulesDinamicIcon color={color} />
									);
											
								}
							}}
				/>
				<TAB.Screen name="myreservations" 
							component={MyReservationsScreen}
							options={{
								tabBarLabel: 'Mis Reservaciones',
								headerShown: false,
								tabBarIcon: ({ focused, color, size }) => {
									if (focused)
										color = styles.color.contrastColor;
									else
										color = styles.color.primaryColor;
									return (
										<TicketDinamicIcon color={color} />
									);
											
								}
							}}
				/>
			</TAB.Navigator>
	);
}
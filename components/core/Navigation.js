import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NewsDinamicIcon, ModulesDinamicIcon, TicketDinamicIcon} from '../ui/DynamicIcons';
import { STYLES as styles } from '../../utils/constants';
import { reservationMadeContext as ReservationMadeContext } from '../../utils/context';

// Screens
import NewsletterStack from '../modules/stacks/NewsletterStack';
import ModulesStack from '../modules/stacks/ModulesStack';
import MyReservationsStack from '../modules/stacks/MyReservationsStack';
import MyReservationsScreen from '../modules/screens/MyReservationsScreen';
import SuggetionsScreen from '../modules/screens/SuggestionsScreen';

const TAB = createBottomTabNavigator();

export default MainNavigation = () => {
	// We don't actually care about the value, we will use it only to re-redering components
	const [reservationMade, setReservationMade] = useState(false);

	return (
		<ReservationMadeContext.Provider value={{reservationMade, setReservationMade}}>
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
							component={MyReservationsStack}
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
		</ReservationMadeContext.Provider>
	);
}
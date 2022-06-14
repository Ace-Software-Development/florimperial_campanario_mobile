import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity} from 'react-native';
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
					tabBarShowLabel: false,
					tabBarActiveTintColor: styles.color.contrastColor,
					tabBarStyle: {
							position: 'absolute',
							bottom: 25, 
							left: 40,
							right: 40,
							elevation: 0,
							borderRadius: 100,
							height: 65,
							...style.shadow
					}
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
										<View style={style.tabView3}>
											<NewsDinamicIcon color={color} />
											<Text style={{fontSize: 10, marginTop: 5, color: focused ? styles.color.contrastColor : styles.color.primaryColor}}>Anuncios</Text>
										</View>
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
										<View style={style.tabView}>
											<ModulesDinamicIcon color={color} />
											<Text style={{fontSize: 10, marginTop: 5, color: focused ? styles.color.contrastColor : styles.color.primaryColor}}>Módulos</Text>
										</View>
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
										<View style={style.tabView2}>
											<TicketDinamicIcon color={color} />
											<Text style={{fontSize: 10, marginTop: 5, marginHorizontal: -1, color: focused ? styles.color.contrastColor : styles.color.primaryColor}}>Reservaciones</Text>
										</View>
									);
											
								}
							}}
				/>
			</TAB.Navigator>
		</ReservationMadeContext.Provider>
	);
}

const style = StyleSheet.create({
	shadow: {
		shadowColor: 'grey',
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.5,
		shadowRadius: 3.5,
		elevation: 5
	},
	tabView: {
		alignItems: 'center',
		justifyContent: 'center',
		top: 3
	},
	tabView2: {
		alignItems: 'center',
		justifyContent: 'center',
		top: 3,
		marginRight: 30
	},
	tabView3: {
		alignItems: 'center',
		justifyContent: 'center',
		top: 3,
		marginLeft: 30
	},
	tabText: {
		fontSize: 10,
		marginTop: 5
	}
});
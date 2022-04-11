import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import NewsletterHomeScreen from '../screens/newsletter/NewsletterHomeScreen';
import NewsletterInfoScreen from '../screens/newsletter/NewsletterInfoScreen';

const NewsletterStackNavigator = createNativeStackNavigator();

export default function NewsletterStack(props) {
	return (
		<NewsletterStackNavigator.Navigator
			initialRouteName='main'
		>
			<NewsletterStackNavigator.Screen 
				name='main'
				component={NewsletterHomeScreen}
				options={{
					headerShown: false,
				}}
			/>
			<NewsletterStackNavigator.Screen 
				name='main'
				component={NewsletterInfoScreen}
				options={{
					headerShown: false,
				}}
			/>
		</NewsletterStackNavigator.Navigator>
	);
}

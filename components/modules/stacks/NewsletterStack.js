import React from 'react';
import { Title } from '../../ui/CampanarioComponents';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import NewsletterHomeScreen from '../screens/newsletter/NewsletterHomeScreen';
import NewsletterInfoScreen from '../screens/newsletter/NewsletterInfoScreen';
import SuggetionsScreen from '../screens/SuggestionsScreen';

const NewsletterStackNavigator = createNativeStackNavigator();

export default function NewsletterStack(props) {
	return (
		<NewsletterStackNavigator.Navigator
			initialRouteName='newsletter_main'
		>
			<NewsletterStackNavigator.Screen 
				name='newsletter_main'
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
			<NewsletterStackNavigator.Screen 
				name='suggestions'
				component={SuggetionsScreen}
				options={{
					title: 'Nueva Sugerencia',
					headerTitle: (props) => <Title {...props}/>,
					headerBackTitleVisible: true
				}}
			/>
		</NewsletterStackNavigator.Navigator>
	);
}

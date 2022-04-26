import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { STYLES as styles } from '../../utils/constants';


import MainNavigation from './Navigation';
import LogInScreen from '../modules/screens/LoginScreen';

const Stack = createStackNavigator();

export default function RootStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LogIn"
                                component={LogInScreen}
                                options={{
                                    headerShown: false,
                                }}
                    />
                <Stack.Screen name="Home"
                                component={MainNavigation}
                                options={{
                                    headerShown: false,
                                }}
                    />
            </Stack.Navigator>
        </NavigationContainer>
    )
}



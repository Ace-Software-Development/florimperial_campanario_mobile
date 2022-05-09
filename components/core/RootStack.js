import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { STYLES as styles } from '../../utils/constants';


import MainNavigation from './Navigation';
import LoginStack from '../modules/stacks/LoginStack';

const Stack = createStackNavigator();

export default function RootStack() {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="LogIn"
                                component={LoginStack}
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



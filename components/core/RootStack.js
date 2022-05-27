import React, { useEffect, useState, createContext, useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { STYLES as styles } from '../../utils/constants';
import Parse from 'parse/react-native';

import MainNavigation from './Navigation';
import LoginStack from '../modules/stacks/LoginStack';

const Stack = createStackNavigator();
const nav = createBottomTabNavigator();


export default function RootStack() {

    return(
            <Stack.Navigator>
                    <Stack.Screen name="LogIn"
                                component={LoginStack}
                                options={{
                                    headerShown: false,
                                    detachPreviousScreen: false
                                }}
                    />
                    <Stack.Screen name="Home"
                                component={MainNavigation}
                                options={{
                                    headerShown: false,
                                    detachPreviousScreen: false
                                }}
                    />
            </Stack.Navigator>
    )
}



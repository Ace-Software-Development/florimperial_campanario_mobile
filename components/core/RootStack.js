import React, { useEffect, useState, createContext, useContext } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import { STYLES as styles } from '../../utils/constants';
import Parse from 'parse/react-native';


import MainNavigation from './Navigation';
import LoginStack from '../modules/stacks/LoginStack';

const Stack = createStackNavigator();

export const AuthContext = createContext({
    hasUser: false, 
    addUser: () => {},
  });

export default function RootStack() {
    const [hasUser, addUser] = useState(false);
    return(
    <AuthContext.Provider value={{ hasUser, addUser }}>
        <NavigationContainer>
            <Stack.Navigator>
                { !hasUser ? (
                    <Stack.Screen name="LogIn"
                                component={LoginStack}
                                options={{
                                    headerShown: false,
                                }}
                    />
                ) : (
                    <Stack.Screen name="Home"
                                component={MainNavigation}
                                options={{
                                    headerShown: false,
                                }}
                    />
                )
                }
            </Stack.Navigator>
        </NavigationContainer>
    </AuthContext.Provider>
    )
}



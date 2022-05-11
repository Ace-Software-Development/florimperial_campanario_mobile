import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';


import UserResetPassword from '../screens/ResetPassScreen';
import LogInScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

export default function LoginStack() {
    return(
            <Stack.Navigator>
                <Stack.Screen name="Login"
                                component={LogInScreen}
                                options={{
                                    headerShown: false,
                                }}
                    />
                <Stack.Screen name="Recuperar contraseña"
                                component={UserResetPassword}
                                options={{
                                    headerShown: true,
                                }}
                    />
            </Stack.Navigator>
    )
}
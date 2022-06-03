import RootStack from './components/core/RootStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import keys from './utils/keys';
import React, {createContext, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Parse from "parse/react-native.js";

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;


export default function App() {


    return (
            <NavigationContainer>
                <RootStack/>
            </NavigationContainer>
    );
}


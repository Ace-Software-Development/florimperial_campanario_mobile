import Navigation from './components/core/Navigation';
import { AsyncStorage } from 'react-native';
import keys from './utils/keys';

import Parse from "parse/react-native.js";

Parse.setAsyncStorage(AsyncStorage);

Parse.initialize(keys.applicationId, keys.javascriptKey);
Parse.serverURL = keys.serverURL;

export default function App() {
    return (
        <Navigation />
    );
}


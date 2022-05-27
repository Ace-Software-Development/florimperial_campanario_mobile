import React, { useContext, useEffect, useState }from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { CampanarioLogoIcon } from "../../ui/DynamicIcons";
import { STYLES as c } from '../../../utils/constants';
import { Parse } from "parse/react-native";
import { useNavigation } from '@react-navigation/native';
const image = require('../../../assets/img/LogoLogin.png');

export default function LoginScreen(props){
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [nameError, setNameError] = useState(null);

 /*  Check for user */
  useEffect(() =>{
    Parse.User.currentAsync().then(user => {
        if (user === undefined || user === null) { 
          navigation.navigate('LogIn')
        } else {
          let sessionToken = user.getSessionToken();
          Parse.User.become(sessionToken).then(object => {
          navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
          });
        }).catch(error => {
          navigation.navigate('LogIn')
        });
      }
    })
  },[])
  

  alertAnError = (title,message) => {
	Alert.alert(
		title,
		message,
		[
			{text: 'OK', onPress: () => {navigation.navigate('LogIn')}},
		]
	)
  }

  /* User log in */
  const onLogin = async() =>{
    if (user === null || password === null ) {
      setNameError(`Favor de llenar los espacios correctamente`);
    } else {
      try {
        let    
	      username = (user).trim(),
      	passwordT = (password).trim();
        await Parse.User.logIn(username.toString(), passwordT.toString());
        textInput.clear();
        textInput1.clear(); 
        setUser('');
        setPassword('');
        setNameError(null);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      } catch (error) {                
        setNameError('Usuario o contraseña incorrectos');
        return (error)
      }
    }
  }
    return (
      <View style={styles.container}>
        <View style={{marginBottom: '15%'}}>
          <CampanarioLogoIcon color={c.color.secondaryColor} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            keyboardType="email-address"
            placeholder="Usuario"
            value={user}
            ref = {input => {textInput = input}}
            onChangeText={user => setUser(user)}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            value={password}
            ref = {input => {textInput1 = input}}
            onChangeText={password => setPassword(password)}/>
        </View>
        <Pressable onPress={() => navigation.navigate('Recuperar contraseña')}>
          <Text style={styles.loginText}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        {!!nameError && (
          <View styles={styles.divError}>
              <Text style={styles.divErrorFont}>{nameError}</Text>
          </View>
        )}
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={onLogin}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableHighlight>        
      </View>
    );
}


const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: "#FFFFFF",
	padding: 30
  },
  row: {
	flexDirection: "row"
  },
  titlePage:{
	marginBottom: 30,
	fontSize: 25,
	fontWeight: 'bold'
  },
  inputContainer: {
	backgroundColor: '#EBEBEB',
	borderRadius: 5,
	height: 50,
	marginBottom: 15,
	flexDirection: 'row'
  },
  divErrorFont:{
	textAlign: 'center',
	color: '#721c24',
	backgroundColor: '#f8d7da',
	borderColor: '#f5c6cb',
	padding: 20,
	marginTop: 10,
	marginBottom: 10,
	borderWidth: 2,
  },
  inputs:{
	height: 50,
	marginLeft:16,
	flex:1,
  },
  fontAwesomeIcon:{
	width:30,
	height:30,
	marginLeft:15,
	justifyContent: 'center'
  },
  buttonContainer: {
	flexDirection: 'row',
	height: 40,
	justifyContent: 'center',
	alignItems: 'center',
	marginTop:140,
	width: 160,
	borderRadius: 10,
  },
  loginButton: {
	backgroundColor: '#EBEBEB',
	borderBottomColor: '#EBEBEB',
	borderBottomWidth: 1,
	justifyContent: 'center',
	alignItems: 'center',
  },
  containerLinksRow:{
	marginTop: 50,
	flexDirection: 'row',
	justifyContent: 'center',
  },
  txtLink:{
	flex: 1,
	flexDirection: 'row',
	justifyContent: 'center',
	alignItems: 'center',
	  padding: 15
  },  
  loginText: {
	color: '#2B4066',
	fontWeight: 'bold'
  },
  imageStl: {
	marginBottom: 50,
	width: 254,
	height: 114,
  }
});
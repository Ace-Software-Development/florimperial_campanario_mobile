import React from 'react';
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
const image = require('../../../assets/img/LogoLogin.png');

export default class LogInScreen extends React.Component{
  static navigationOptions = {
	header: null,
  };

  constructor(props){
	super(props);
	this.state = {
		username: '',
		password: '',
		nameError: null
	}
	Parse.User.currentAsync().then(user => {
	if (user !== undefined || user !== null) { 
		this.navigateToPage('LogIn'); 
	} else {
		let sessionToken = user.getSessionToken();
		Parse.User.become(sessionToken).then(object => {
		this.navigateToPage('Home');
		}).catch(error => {
		this.navigateToPage('LogIn');
		});
	}
	})
  }

  navigateToPage = (page) => {
	this.props.navigation.navigate(page);
  }

  alertAnError = (title,message) => {
	Alert.alert(
		title,
		message,
		[
			{text: 'OK', onPress: () => {this.navigateToPage('LogIn')}},
		]
	)
  }

  /*componentWillMount(){
	Parse.User.currentAsync().then(user => {
	  if (user !== undefined || user !== null) { 
		this.navigateToPage('LogIn'); 
	  } else {
		let sessionToken = user.getSessionToken();
		Parse.User.become(sessionToken).then(object => {
		  this.navigateToPage('Home');
		}).catch(error => {
		  this.navigateToPage('LogIn');
		});
	  }
	})
  }*/


  onLogin = async() =>{
	let    
	username = (this.state.username).trim(),
	password = (this.state.password).trim();

    if (username === "" || password === "" ) {
      this.setState(() => ({ nameError: `Favor de llenar los espacios correctamente` }));
    } else {
      try {
        await Parse.User.logIn(username.toString(), password.toString());
        //this.submitAndClear();
        this.textInput.clear();
        this.textInput1.clear(); 
        this.state.username = '';
        this.state.password = '';
        this.state.nameError = null;
        this.props.navigation.navigate('Home');  
      } catch (error) {                
        this.setState(() => ({ nameError: 'Usuario o contraseña incorrectos' }));
        return (error)
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: '15%'}}>
          <CampanarioLogoIcon color={c.color.secondaryColor} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            keyboardType="email-address"
            placeholder="Usuario"
            value={this.state.username}
            ref = {input => {this.textInput = input}}
            onChangeText={(username) => this.setState({username})}/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            placeholder="Contraseña"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            value={this.state.password}
            ref = {input => {this.textInput1 = input}}
            onChangeText={(password) => this.setState({password})}/>
        </View>
        <Pressable onPress={() => this.props.navigation.navigate('Recuperar contraseña')}>
          <Text style={styles.loginText}>¿Olvidaste tu contraseña?</Text>
        </Pressable>
        {!!this.state.nameError && (
          <View styles={styles.divError}>
              <Text style={styles.divErrorFont}>{this.state.nameError}</Text>
          </View>
        )}
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.onLogin}>
          <Text style={styles.loginText}>Iniciar Sesión</Text>
        </TouchableHighlight>        
      </View>
    );
  }
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
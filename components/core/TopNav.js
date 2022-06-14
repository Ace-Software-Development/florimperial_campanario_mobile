// M004 M005 M006
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image, Alert, Modal,Text, Pressable, TouchableOpacity, SafeAreaView } from 'react-native';
import { Title, Subtitle, P } from '../ui/CampanarioComponents';
import ProfileIcon from '../../assets/icons/profile-icon.svg';
import { STYLES as c } from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';
import QRCode from 'react-native-qrcode-svg';
import SuggetionsIcon from '../../assets/icons/suggestions-icon.svg';
import SupportNumberIcon from '../../assets/icons/support-number-icon.svg';
import LogOutIcon from '../../assets/icons/log-out-icon.svg';
import * as Linking from "expo-linking";
import { getSupportNumber } from '../../utils/client';



export default function TopNav(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [userID, setUserID] = useState('');
	const [supportNumber, setSupportNumber] = useState(0);


	const navigation = useNavigation();
	/* Get the current user and their email */
	useEffect(() => {
		async function getCurrentUser() {
		  if (username === '') {
			const currentUser = await Parse.User.currentAsync();
			if (currentUser !== null) {
			  setUsername(currentUser.getUsername());
			  setEmail(currentUser.getEmail());
			}
		  }
		}
		getCurrentUser();
	}, [username, email]);

	/*User log out*/
	const doUserLogOut = async function () {
		return await Parse.User.logOut()
		  .then(async () => {
			const currentUser = await Parse.User.currentAsync();
			if (currentUser === null) {
			  navigation.reset({
				index: 0,
				routes: [{name: 'LogIn'}],
			  });
			  Alert.alert('Exito!', 'Ha cerrado sesión exitosamente');
			  setModalVisible(!modalVisible)
			  
			}
			return true;
		  })
		  .catch((error) => {
			Alert.alert('Error!', error.message);
			return false;
		  });
	};

	/*get the current user's ID*/
	useEffect(() => {
		async function getUserID() {
			const userID = await Parse.User.currentAsync();
			setUserID(userID.id);
		}
		getUserID();
	}, [userID]);

	/* Alert to verify if the user wants to log out */
	const logOutAlert = () => {
		Alert.alert(
			'Cerrar sesión',
			'¿Estás seguro de que quieres cerrar sesión?',
			[
				{
				  text: "Cancelar",
				  style: "cancel"
				},
				{ text: "OK", onPress: () => doUserLogOut() }
			  ]
		);
	}

	/* navigate to suggestions screen */
	const suggestionsFunction = () => {
		setModalVisible(!modalVisible);
		navigation.navigate('suggestions');
	}

	/* get support number using query function */
	useEffect(() => {
		const number = 0;
		getSupportNumber().then(number => setSupportNumber(number)).catch((error) => console.log(error));
	}, []);

	return (
		<View style={styles.container}>

			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
				Alert.alert('Modal has been closed.');
				setModalVisible(!modalVisible);
				}}>

				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<View style={{borderBottomColor: c.color.grey, borderBottomWidth: 1, marginBottom: 15}}> 
							<Title>{username}</Title>
							<P size="small">{email}</P>
						</View>

						<SafeAreaView style={{ padding: 7}}>
							<View style={styles.qrContainer}>
								<QRCode
								//QR code value UZvfQQfIZT
								value={'https://campanario.b4a.app/reservaciones/socios/'+userID}
								//size of QR Code
								size={200}
								//Color of the QR Code
								color="black"
								//Background Color of the QR Code
								backgroundColor="white"
								/>
							</View>
						</SafeAreaView>

						<TouchableOpacity style={styles.profileListItem} onPress={() => suggestionsFunction()}>
							<SuggetionsIcon style={styles.profileListIcon}/>
							<P style={styles.elementText}> Sugerencias </P>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileListItem} onPress={() => Linking.openURL('tel:'+supportNumber)}>
							<SupportNumberIcon style={styles.profileListIcon}/>
							<P style={styles.elementText}> Número de apoyo </P>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileListItem} onPress={() => logOutAlert()}>
							<LogOutIcon style={styles.profileListIcon}/>
							<P style={styles.elementText}> Cerrar sesión</P>
						</TouchableOpacity>

						<TouchableOpacity style={[styles.button, styles.buttonClose]}
									onPress={() => setModalVisible(!modalVisible)}>
							<P style={styles.textStyle}>Cerrar</P>
						</TouchableOpacity>
					</View>
				</View>

			</Modal>

			<Title>{props.title}</Title>

			<TouchableOpacity style={styles.perfilBtn} onPress={() => setModalVisible(true)}>
				<ProfileIcon height={30} width={30} />
			</TouchableOpacity>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%", 
		height: 60,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	perfilBtn: {
		height: 40,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center'
	},

	elementText: {
		color: c.color.primaryColor,
		marginLeft: 35
	},

	profileListIcon: {
		resizeMode: "contain",
		position: 'absolute',
		top: 2
	}, 

	profileListItem: {
		marginVertical: 7,
	},

	centeredView: {
		flex: 1,
		justifyContent: 'center',
		elevation: 10,
		marginTop: 22
	},

	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		shadowColor: '#000',
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},	
		
	button: {
		borderRadius: 20,
		padding: 10,
	},

	buttonClose: {
		marginTop: 15,
		backgroundColor: c.color.grey,
		alignSelf: 'center'
	},

	textStyle: {
		color: c.color.primaryColor,
		fontWeight: 'bold',
		textAlign: 'center',
		marginHorizontal: 45
	}, 
	qrContainer: {
		
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		padding: 10,
	}
})
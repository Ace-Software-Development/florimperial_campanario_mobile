import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Image, Alert, Modal,Text, Pressable, TouchableOpacity } from 'react-native';
import { Title, Subtitle, P } from '../ui/CampanarioComponents';
import ProfileIcon from '../../assets/icons/profile-icon.svg';
import adptvIcon from '../../assets/img/adaptive-icon.png';
import { STYLES as c } from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import Parse from 'parse/react-native';



export default function TopNav(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');

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

						<TouchableOpacity style={styles.profileListItem}>
							<Image style={styles.profileListIcon} source={adptvIcon}/>
							<P style={styles.elementText}> Reglamento </P>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileListItem}>
							<Image style={styles.profileListIcon} source={adptvIcon}/>
							<P style={styles.elementText}> Sugerencias </P>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileListItem}>
							<Image style={styles.profileListIcon} source={adptvIcon}/>
							<P style={styles.elementText}> Número de apoyo </P>
						</TouchableOpacity>

						<TouchableOpacity style={styles.profileListItem} onPress={() => logOutAlert()}>
							<Image style={styles.profileListIcon} source={adptvIcon}/>
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
		width: 30,
		height: 28,
		position: 'absolute'
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
	}
})
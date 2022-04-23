import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert, Modal,Text, Pressable, TouchableOpacity } from 'react-native';
import { Title } from '../ui/CampanarioComponents';
import perfilIMG from '../../assets/img/perfilIMG.png'
import adptvIcon from '../../assets/img/adaptive-icon.png'
import{ Subtitle } from '../ui/CampanarioComponents';
import { STYLES as c } from '../../utils/constants';


export default function TopNav(props) {

	const [modalVisible, setModalVisible] = useState(false);

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
						<Subtitle style={styles.profileName}>You know who</Subtitle>
						<Text style={styles.profileID}>0001</Text>
					</View>

					<Pressable >
						<Image style={styles.profileListIcon} source={adptvIcon}/>
						<Text style={styles.elementText}> Reglamento </Text>
					</Pressable>

					<Pressable>
						<Image style={styles.profileListIcon} source={adptvIcon}/>
						<Text style={styles.elementText}> Sugerencias </Text>
					</Pressable>

					<Pressable>
						<Image style={styles.profileListIcon} source={adptvIcon}/>
						<Text style={styles.elementText}> Número de apoyo </Text>
					</Pressable>

					<Pressable>
						<Image style={styles.profileListIcon} source={adptvIcon}/>
						<Text style={styles.elementText}> Cerrar sesión</Text>
					</Pressable>

					

					<Pressable
					style={[styles.button, styles.buttonClose]}
					onPress={() => setModalVisible(!modalVisible)}>
					<Text style={styles.textStyle}>Cerrar</Text>
					</Pressable>
				</View>
				</View>

			</Modal>

			<Pressable style={styles.perfilBtn} onPress={() => setModalVisible(true)}>
				<Image style={styles.perfilImg} source={perfilIMG}/>
			</Pressable>

			<Title style={{marginTop: 10}}>{props.title}</Title>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%", 
		height: 50,
		marginBottom: 15
	},

	perfilImg: {
		resizeMode: "contain",
		width: 30,
		height: 28,
	}, 

	perfilBtn: {
		padding: 15,
		position: 'absolute',
		right: -14,
	}, 

	profileName: {
		color: c.color.primaryColor,
		fontSize: 25,
		marginBottom: 0
	},

	profileID: {
		marginTop: 0,
		color: "#EBEBEB",
		fontSize: 16,
		marginBottom: 5
	},

	elementText: {
		color: c.color.primaryColor,
		fontSize: 16,
		marginBottom: 15,
		marginHorizontal: 35
	},

	profileListIcon: {
		resizeMode: "contain",
		width: 30,
		height: 28,
		position: 'absolute'
	}, 


	centeredView: {
		flex: 1,
		justifyContent: 'center',
		marginTop: 22
	  },
	  modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		
		shadowColor: '#000',
		shadowOffset: {
		  width: 0,
		  height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	  },
	  button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	  },
	  buttonOpen: {
		backgroundColor: '#F194FF',
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
	  modalText: {
		marginBottom: 15,
		textAlign: 'center',
	  },
})
import React, { useState, useEffect } from 'react';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../ui/CampanarioComponents';
import { STYLES as c } from '../../utils/constants';
import Guests from '../ui/Guests';

export default function GuestsSection(props) {
    //Invitados
	const [guest, setGuest] = useState();
    const [guests, setGuests] = useState([]);
    const maxGuests = 4;
	var pressed = 0;

    /* Se agregan invitado a la lista unicamente si no se ha alcanzado el máximo de invitados */
    const handleAddGuests = () => {
        Keyboard.dismiss();
		if(guests.length < maxGuests && guest != null){
			setGuests([...guests, guest]);
            props.getList(guest);
            setGuest(null);
        }else if(guest == null){
			pressed++;
			if(pressed > 5){
				Alert.alert('No se ha introducido ningún nombre', 'Escriba el nombre del invitado', [
					{text: 'Aceptar'}
				])
				pressed = 0;
			}
		}else{
			Alert.alert('Máximo alcanzado', 'Ya no se pueden agregar mas invitados', [
				{text: 'Aceptar'}
			])
        }
    }

	/* Se borran los invitados seleccionados */
	const deleteGuest = (index) => {
		let guestsCopy = [...guests];
		guestsCopy.splice(index, 1);
        props.deleteGuest(guestsCopy);
		setGuests(guestsCopy);
	}
    
    return (
        /* Agrega los invitados */
        <View style={style.guestsContainer}>
            <Subtitle>Agrega más asistentes</Subtitle>
            <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={style.keyboardContainer}
                >
                <TextInput 
                    placeholder={'Escribe el nombre del invitado'}
                    style={style.input}
                    value={guest}
                    onChangeText={text => setGuest(text)}/>
                <TouchableOpacity onPress={() => handleAddGuests()}>
                    <View style={style.addWrapper}>
                        <P color="light">+</P>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            <View>
                {/* Aqui van a ir los invitados agregados */}
                {
                    guests.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} onPress={() => deleteGuest(index)}>
                                <Guests text={item} />
                            </TouchableOpacity>)
                    })
                }
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    guestsContainer: {
		marginTop: 20
	},
    keyboardContainer: {
        alignItems: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    input: {
        backgroundColor: c.color.grey,
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 10,
		width: '80%',
		fontSize: RFPercentage(2.1)
    }, 
    addWrapper: {
        width: 35,
        height: 35,
		backgroundColor: c.color.primaryColor,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
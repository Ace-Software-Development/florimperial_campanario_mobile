import React, { useState, useEffect } from 'react';
import { RFPercentage } from "react-native-responsive-fontsize";
import { View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { P, Subtitle, Guests } from '../ui/CampanarioComponents';
import { STYLES as c } from '../../utils/constants';
import { getAllActiveUsers } from '../../utils/client';
import { ScrollView } from 'react-native-gesture-handler';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function GuestsSection(props) {
    //Invitados
	const [guest, setGuest] = useState();
    const [partnersList, setPartnersList] = useState([]);
    const maxGuests = props.maxGuests;
	var pressed = 0;

    /* Get all Users from DB */
    useEffect(() => {
        getAllActiveUsers().then( response => {
            const data = [];
            response.forEach(i => {
                data.push({id: i.id, username: i.get('username')});
            });
            setPartnersList(data);
        });
    }, [])

    /* Se agregan invitado a la lista unicamente si no se ha alcanzado el máximo de invitados */
    const handleAddGuests = () => {
		Keyboard.dismiss();
        if(props.guests.length < maxGuests && guest != null){
            let guestDic = {id: "", username: guest}
            props.setGuests([...props.guests, guestDic]);
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

    /* Adds partners from DB to guests list if maxGuests hasn't been reached  */
    const handleAddPartners = (index) => {
        if (props.guests.length < maxGuests){
            let guestDic = {id: index.id, username: index.username}
            props.setGuests([...props.guests, {id: index.id, username: index.username}]);
            setGuest(null);
        }else{
			Alert.alert('Máximo alcanzado', 'Ya no se pueden agregar mas invitados', [
				{text: 'Aceptar'}
			])
        }
    }

    /* Filters partners that aren't in list guests and that matches text written on text input */
    const filterPartners = (i) => {
        let guestsSet = new Set();
        for(let j of props.guests){
            if(j.id != undefined){
                guestsSet.add(j.id);
            }
        }

        if(!guestsSet.has(i.id)){
            return i.username.toLowerCase().includes(guest.toLowerCase());
        }else{
            return false;
        }
    }

    return (
        /* Agrega los invitados */
        <View style={style.guestsContainer}>
            <Subtitle>Agrega más socios o invitados</Subtitle>
            <P size='small'>Máximo de invitados: {maxGuests}</P>

            {/* Partners list */}
            {guest ? (
                <View style={style.partnersContainer}>
                    <ScrollView contentContainerStyle={style.scrollPartnerContainer}>
                        {
                            partnersList.filter(i => filterPartners(i)).map(index => {
                                return (
                                        <TouchableOpacity
                                            key={index.id}
                                            style={style.deployableList} 
                                            onPress={() => handleAddPartners(index)}>
                                                <P>{index.username}</P>
                                        </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
                    ) : null}

            <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={style.keyboardContainer}
                >
                <TextInput 
                    placeholder={'Escribe el nombre del invitado'}
                    style={style.input}
                    value={guest}
                    onChangeText={text => setGuest(text)}
                />
                <TouchableOpacity onPress={() => handleAddGuests()}>
                    <View style={style.addWrapper}>
                        <P color="light">+</P>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>

            <View>
                {/* Here goes the added guests */}
                {   
                props.guests.map((item, index) => {
                    return (
                        <Guests 
                            key={index}
                            text={item.username}
                            index={index}
                            guests={props.guests}
                            setGuests={props.setGuests}
                            isPartner={item.id != "" ? true : false}
                        />
                        )
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
    },
    deployableList: {
        backgroundColor: c.color.lightBg,
        padding: 5,
        width: '80%',
        borderWidth: 0.2,
        borderColor: c.color.lightGrey
    },
    partnersContainer: {
        width: '100%',
        height: 200,
        position: 'absolute',
        top: '-70%',
        paddingBottom: 50,
    },
    scrollPartnerContainer: {
        flexGrow: 1, 
        justifyContent: 'flex-end',
    } 
})
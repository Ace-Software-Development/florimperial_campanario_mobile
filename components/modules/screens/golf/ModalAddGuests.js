import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Modal, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn, Btn } from '../../../ui/CampanarioComponents';
import { STYLES as c } from '../../../../utils/constants';

export default function ModalAddGuests(props) {
    const [guest, setGuest] = useState();
    const [guests, setGuests] = useState([]);
    const maxGuests = 3;
    const [maxGuestsReached, setMaxGuests] = useState(false);

    /* Se cierra el modal y la lista de invitados se vacía */
    const closeModal = () => {
        setGuests([]);
        props.setModalOpen(false);
    }

    /* Se agregan invitado a la lista unicamente si no se ha alcanzado el máximo de invitados */
    const handleAddGuests = () => {
        if(guests.length < maxGuests){
            setGuests([...guests, guest]);
            setGuest(null);
        }else{
            // Alert.alert('Máximo alcanzado', 'Ya no se pueden agregar mas invitados', [
            //     {text: 'Aceptar'}
            // ])
            setMaxGuests(true);
        }
    }

    /* Se guardan los invitados en la base de datos */
    const saveGuests = () => {}

    return(
        <Modal visible={props.openModal} animationType='slide'>
            <View style={style.modalBackground}>
                <View style={[style.modalContainer]}> 
                    <View>
                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                            style={style.keyboardContainer}
                        >
                            <TextInput 
                                placeholder={'Escribe el nombre del invitado'}
                                style={style.Input}
                                value={guest}
                                onChangeText={text => setGuest(text)}/>
                            <TouchableOpacity onPress={() => handleAddGuests()} disabled={maxGuestsReached}>
                                <View style={style.addWrapper}>
                                    <P>+</P>
                                </View>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                        <View>
                            {/* Aqui van a ir los invitados agregados */}
                            {
                                guests.map((item, index) => {
                                    return <P key={index}>{item}</P>
                                })
                            }
                        </View>
                    </View>
                    <View style={style.btnContainer}>
                        <Btn style={style.btnStyle} onPress={closeModal}>
                            <P>Cerrar</P>
                        </Btn>
                        <Btn style={style.btnStyle}>
                            <P>Guardar</P>
                        </Btn>
                    </View>
                </View>
            </View> 
        </Modal>
    );
}

const style = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgb(0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    btnStyle: {
        
    },
    keyboardContainer: {
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    Input: {
        backgroundColor: c.color.grey,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 30,
    }, 
    addWrapper: {
        width: 30,
        height: 30,
        backgroundColor: c.color.grey,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
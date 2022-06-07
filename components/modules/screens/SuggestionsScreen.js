import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Title } from '../../ui/CampanarioComponents';
import { ScreenContainer } from '../../ui/CampanarioComponents';
import { Dropdown } from 'react-native-element-dropdown';
import { getArea } from '../../../utils/client';
import {postSuggestion} from '../../../utils/client';
import { useNavigation } from '@react-navigation/native';


export default function SuggetionsScreen(props) {
    const navigation = useNavigation();
    const [areas, setallAreas] = useState([]);
    const [value, setValue] = useState(null);
    const [area, setArea] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(() => {
		const data = new Map();
		getArea().then(data => setallAreas(data));
	}, []);

    const dropdownData = [];

    for (let i of areas) {
        dropdownData.push({ label: i[1], value: i[0] })
    }

    const onSendSuggestion = () => {
		if (area != null && comment != null ) {
            postSuggestion(area, comment);
            navigation. popToTop();
        } else {
            console.log('no nice');
        }
	}

    return (
        <ScreenContainer>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View>
                    <View>
                        <Text style={styles.text}>Módulo:</Text>
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            iconStyle={styles.iconStyle}
                            data={dropdownData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Selección..."
                            value={area}
                            onChange={area => {
                            setArea(area.value);
                            }}
                        />
                    </View>
                
                    <View style={styles.textInputView}>
                        <TextInput style={styles.textInput}
                            onPress={Keyboard.dismiss()} accessible={false}
                            multiline
                            textAlignVertical='top'
                            numberOfLines={8}
                            placeholder="Escribe tus comentarios"
                            fontSize={16}
                            value={comment}
                            onChangeText={comment => setComment(comment)}
                            on
                        />
                    </View>

                    <View style={styles.buttonMainContainer} >
                        <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={() => onSendSuggestion()}>
                            <Text style={styles.sendText}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ScreenContainer>
	);
}       

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    text: {
        fontSize: 18, 
        position: 'absolute',
		top: 2
    },
    textInputView: {
        marginVertical: 25,
        backgroundColor: 'white',
        borderRadius: 10
    },
    textInput: {
        padding: 10,
        marginTop: 0,
    },
    buttonMainContainer: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: 20,
        flexDirection: 'row',
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
    sendButton: {
        backgroundColor: '#EBEBEB',
        borderBottomColor: '#EBEBEB',
        borderBottomWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendText: {
        color: '#2B4066',
        fontWeight: 'bold'
    },
    dropdown: {
        backgroundColor: '#EBEBEB',
        bottom: 22, 
        marginLeft: 90,
        width: 170,
        margin: 16,
        height: 45,
        borderRadius: 20,
      },
      placeholderStyle: {
        color: 'gray',
        fontSize: 16,
        paddingLeft: 15
      },
      selectedTextStyle: {
        color: '#2B4066',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 15
      },
      
})

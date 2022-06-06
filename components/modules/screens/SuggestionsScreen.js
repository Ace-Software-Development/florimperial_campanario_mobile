import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Title } from '../../ui/CampanarioComponents';
import { ScreenContainer } from '../../ui/CampanarioComponents';
//import Constants from 'expo-constants';
//import DropDownPicker from 'react-native-dropdown-picker'


export default function SuggetionsScreen(props) {
    return (
        <ScreenContainer>
            <View>
                <Text style={styles.text}>Módulo:</Text>
            </View>
            <View style={styles.textInputView}>
                <TextInput style={styles.textInput}
                    multiline
                    textAlignVertical='top'
                    numberOfLines={8}
                    placeholder="Escribe tus comentarios"
                    fontSize={16}
                />
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]}>
                    <Text style={styles.sendText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </ScreenContainer>
	);
}       

const styles = StyleSheet.create({
    text: {
        fontSize: 18, 
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
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
})

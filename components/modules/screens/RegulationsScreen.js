//M013 M018 M022 M026 M028
import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { P, Subtitle, Title } from '../../ui/CampanarioComponents';
import { getRegulations } from '../../../utils/client';

export default function RegulationsScreen({route, navigation}) {
    const [regulations, setRegulations] = useState('');
    
    useEffect(() => {
        getRegulations(route.params.module).then(response => {
            const data = response[0].get('contenido');
            setRegulations(data);
        })
    }, [])

    return(
        <ScrollView style={style.scrollContainer}>
            <View style={style.textContainer}>
                <P>{regulations}</P>
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create ({
    scrollContainer: {
        paddingTop: 20,
        marginHorizontal: 20
    },
    textContainer: {
        alignItems: 'center',
        marginHorizontal: 15
    }
});
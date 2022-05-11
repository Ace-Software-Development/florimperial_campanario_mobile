import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native';
import { P, Subtitle, Title } from '../../../ui/CampanarioComponents';
import REGULATIONS from '../../../../utils/regulations';

export default function GolfRegulationsScreen(props) {
    return(
        <ScrollView style={style.scrollContainer}>
            <View style={style.textContainer}>
                <P>{REGULATIONS.GOLF_REGULATIONS}</P>
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
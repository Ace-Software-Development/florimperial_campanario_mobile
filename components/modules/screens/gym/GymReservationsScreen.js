import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView  } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import DateOption from '../../../ui/DateOption';

export default function GymReservationsScreen(props) {
    
    return (
        <ScreenContainer style={{paddingTop: 0, flex: 1}}>
            <ScrollView style={{paddingTop: 0, flex: 1}} contentContainerStyle={{ flexGrow: 1 }} >
                <View>
                    <P>Reservaciones gym</P>
                </View>
            </ScrollView>
        </ScreenContainer>
    )
}
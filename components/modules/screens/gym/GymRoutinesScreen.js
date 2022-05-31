import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, TextInput, ScrollView, Alert, Keyboard } from 'react-native';
import { ScreenContainer, P, Subtitle, ActionBtn } from '../../../ui/CampanarioComponents';
import GymDayOption from '../../../ui/GymDayOption';
import { TrainingCard } from '../../../ui/CampanarioComponents';
import { STYLES as c } from '../../../../utils/constants';
import { getRoutines, getTrainings } from '../../../../utils/client';

export default function GymRoutinesScreen(props) {
    const [selectedRoutineId, setSelectedRoutineId] = useState(null);
    const [routines, setRoutines] = useState([]);
    const [trainings, setTrainings] = useState([]);

    useEffect( () =>{
        getRoutines().then(data => setRoutines(data));
    }, [])

    useEffect( () => {
        getTrainings(selectedRoutineId).then(data => setTrainings(data));
    }, [selectedRoutineId])

    return(
        <ScreenContainer style={{paddingTop: 0, flex: 1}}>
            {!routines ? (
                <P>No tiene rutinas activas, consulte a su entrenador</P>
            ) : null
            }
            <View style={style.dayViewContainer}>
            <ScrollView contentContainerStyle={{ alignItems: 'center'}} style={style.datePickerContainer} horizontal={true}>
                {routines.map((routine, i) => {
                    return(
                        <GymDayOption
                            key = {i}
                            defaultActive={false}
                            title={routine.get('titulo')}
                            value = {routine.id}
                            onClick = {value => setSelectedRoutineId(value)}
                            selectedRoutineId = {selectedRoutineId}
                            setSelectedRoutineId = {setSelectedRoutineId}
                        />
                    )
                })}   
            </ScrollView>
            </View>
            
            <ScrollView>
                {trainings.map((training, i) => {
                        return(
                            <TrainingCard
                                key = {i}
                                ejercicio = {training.get('nombre')}
                                reps = {training.get('repeticiones')}
                                series = {training.get('series')}
                            />
                        )
                })}
            </ScrollView>
        </ScreenContainer>
    )
}

const style = StyleSheet.create({
    datePickerContainer: {
		flexDirection: 'row',
        flexWrap: 'wrap',
	},
    dayViewContainer: {
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height:50,
        width: '100%'
    },
})
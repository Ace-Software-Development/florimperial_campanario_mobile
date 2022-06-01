//MGI013
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

    /*Get the routines assosiated with the user*/
    useEffect( () =>{
        getRoutines().then(data => setRoutines(data));
    }, [])

    /*Get the trainings for the selected routine */
    useEffect( () => {
        getTrainings(selectedRoutineId).then(data => setTrainings(data));
    }, [selectedRoutineId])

    return(
        <ScreenContainer style={{paddingTop: 0, flex: 1}}>    
            <View style={style.dayViewContainer}>
            {routines.length === 0 ? (
                <P>No tiene rutinas activas, consulte a su entrenador</P>
            ) : null
            }
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
                                notas = {training.get('notas')}
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
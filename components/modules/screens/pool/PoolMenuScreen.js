import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';
import ClockIcon from '../../../../assets/icons/clock-icon.svg';
import RaquetaIcon from '../../../../assets/icons/raqueta-icon.svg';
import SwimIcon from '../../../../assets/icons/swim-icon.svg';

export default function PoolMenuScreen(props) {
    const navigation = useNavigation();
    return (
        <ScreenContainer>

            <View style={style.container}>
            	<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Horarios y resevaciones" onPress={() => navigation.navigate('pool_reservations')} >
						<ClockIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Clases personalizadas" /*onPress={() => navigation.navigate()} */>
						<SwimIcon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
            </View>
        </ScreenContainer>
    )
}

const style = StyleSheet.create({
	container: {
		marginBottom: 40
	}
});
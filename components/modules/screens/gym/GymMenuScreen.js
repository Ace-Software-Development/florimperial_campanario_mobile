import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';
import ClockIcon from '../../../../assets/icons/clock-icon.svg';
import GymIcon from '../../../../assets/icons/gym-icon.svg';
import RutinasIcon from '../../../../assets/icons/rutinas-icon.svg';
import BookIcon from '../../../../assets/icons/book-icon.svg';

export default function GymReservationsScreen(props) {
    const navigation = useNavigation();
    return (
        <ScreenContainer>

            <View style={style.container}>
            	<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Horarios y resevaciones" onPress={() => navigation.navigate('gym_reservations')}>
						<ClockIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Clases personalizadas" onPress={() => navigation.navigate('gym_classes_reservations')}>
						<GymIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Rutinas" onPress={() => navigation.navigate('gym_routines')}>
						<RutinasIcon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
            </View>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reglamentos</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reglamento general" onPress={() => navigation.navigate('gym_regulations')}>
						<BookIcon width={30} height={30} />
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
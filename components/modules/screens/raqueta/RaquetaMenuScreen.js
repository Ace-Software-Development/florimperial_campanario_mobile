import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';
import ClockIcon from '../../../../assets/icons/clock-icon.svg';
import RaquetaIcon from '../../../../assets/icons/raqueta-icon.svg';
import BookIcon from '../../../../assets/icons/book-icon.svg';

export default function RaquetaMenuScreen(props) {
    const navigation = useNavigation();
    return (
        <ScreenContainer>

            <View style={style.container}>
            	<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Horarios y resevaciones" onPress={() => navigation.navigate('raqueta_reservations')} >
						<ClockIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Clases personalizadas" onPress={() => navigation.navigate('raqueta_classes_reservations')}>
						<RaquetaIcon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
            </View>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reglamentos</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reglamento general" onPress={() => navigation.navigate('racket_regulations')}>
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
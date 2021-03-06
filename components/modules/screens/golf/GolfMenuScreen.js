import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';
import ClockIcon from '../../../../assets/icons/clock-icon.svg';
import TeePracticeIcon from '../../../../assets/icons/tee-practice-icon.svg';
import Golf2Icon from '../../../../assets/icons/golf2-icon.svg';
import BookIcon from '../../../../assets/icons/book-icon.svg';

export default function GolfMenuScreen(props) {
	const navigation = useNavigation();
	return (
		<ScreenContainer>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reservaciones generales" onPress={() => navigation.navigate('golf_reservations')}>
						<ClockIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Reservar con profesor" onPress={() => navigation.navigate('golf_classes_reservations')}>
						<TeePracticeIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Reservar Tee de práctica" onPress={() => navigation.navigate('golf_tee')}>
						<Golf2Icon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
			</View>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reglamentos</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reglamento general" onPress={() => navigation.navigate('golf_regulations')}>
						<BookIcon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
			</View>
			
		</ScreenContainer>
	);
}

const style = StyleSheet.create({
	container: {
		marginBottom: 40
	}
});
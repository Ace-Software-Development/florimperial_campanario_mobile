import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScreenContainer, Subtitle } from '../../../ui/CampanarioComponents';
import { ModulesMenuList, ModulesMenuListItem } from '../../../ui/ModulesMenuList';
import { useNavigation } from '@react-navigation/native';
//import ClockIcon from '../../../ui/svg/ClockIcon';
import ClockIcon from '../../../../assets/icons/clock-icon.svg';
import TeePracticeIcon from '../../../../assets/icons/tee-practice-icon.svg';
import Golf2Icon from '../../../../assets/icons/golf2-icon.svg';

export default function GolfMenuScreen(props) {
	const navigation = useNavigation();
	return (
		<ScreenContainer>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reservaciones</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Horarios y reservaciones" onPress={() => navigation.navigate('golf_reservations')}>
						<ClockIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Clases grupales" onPress={() => navigation.navigate('golf_classes_reservations')}>
						<TeePracticeIcon width={30} height={30} />
					</ModulesMenuListItem>
					<ModulesMenuListItem title="Tee de práctica" onPress={() => navigation.navigate('golf_tee')}>
						<Golf2Icon width={30} height={30} />
					</ModulesMenuListItem>
				</ModulesMenuList>
			</View>

			<View style={style.container}>
				<Subtitle style={{marginBottom: 10}}>Reglamentos</Subtitle>
				<ModulesMenuList>
					<ModulesMenuListItem title="Reglamento general" onPress={() => navigation.navigate('golf_regulations')} />
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
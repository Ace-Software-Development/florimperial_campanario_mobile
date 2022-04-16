import React from 'react';
import { View } from 'react-native';
import { ScreenContainer, AnnoucementCard } from '../../../ui/CampanarioComponents';
import TopNav from '../../../core/TopNav';
import golfIMG from '../../../../assets/img/golfIMG.png'
import gymIMG from '../../../../assets/img/gymIMG.jpeg'
import kidsclubIMG from '../../../../assets/img/kidsclubIMG.jpg'


export default function NewsletterHomeScreen(props) {
	return (
		<ScreenContainer>

			<TopNav title='Anuncios' />

			<View>
				<AnnoucementCard  
					title='Verano Campanario'
					timeTitle='Hace 3 días'
					source={golfIMG}
					onPress={() => {}}
				/>

				<AnnoucementCard  
					title='GYM & Fitness'
					timeTitle='Hace 2 días'
					source={gymIMG}
					onPress={() => {}}
				/>

				<AnnoucementCard  
					title="Kid's Club"
					timeTitle='Hace 3 días'
					source={kidsclubIMG}
					onPress={() => {}}
				/>
			</View>

		</ScreenContainer>
	);
}

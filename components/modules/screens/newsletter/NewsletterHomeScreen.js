import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { ScreenContainer } from '../../../ui/CampanarioComponents';
import Poster from '../../../ui/Poster';
import TopNav from '../../../core/TopNav';
import Parse from 'parse/react-native.js';
import { normalizeDayMonthFormat } from '../../../../utils/timeHelpers';


export default function NewsletterHomeScreen(props) {
	const [posters, setPosters] = useState([]);

	// Component did mount
	useEffect(() => {
		const fetchImages = async () => {
			let query = new Parse.Query('Anuncio');
			query.equalTo('eliminado', false);
			const results = await query.find();
			setPosters(results);
		};
		fetchImages();
	}, []);

	return (
		<ScrollView>
			<ScreenContainer>
				<TopNav title='Anuncios' />
				<View>
				{/* { posters.map( (poster, i) => {
					return (
					<Poster key={i} 
							source={poster.get('imagen').url()}
							timeTitle={normalizeDayMonthFormat(poster.get('createdAt'))}
							style={{marginBottom: 20}}
					/>
					)
				}) } */}
				</View>
			</ScreenContainer>
		</ScrollView>
	);
}

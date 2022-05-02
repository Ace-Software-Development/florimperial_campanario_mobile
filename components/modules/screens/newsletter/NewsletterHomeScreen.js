import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ScreenContainer } from '../../../ui/CampanarioComponents';
import Poster from '../../../ui/Poster';
import TopNav from '../../../core/TopNav';
import Parse from 'parse/react-native.js';

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
		<ScreenContainer>
			<TopNav title='Anuncios' />
			<View>
			{ posters.map( (poster, i) => {
				return (
				<Poster key={i} 
						source={poster.get('imagen').url()}
						timeTitle={poster.get('createdAt').toISOString()}
				/>
				)
			}) }
			</View>
		</ScreenContainer>
	);
}

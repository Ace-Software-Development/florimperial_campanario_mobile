import React from 'react';
import { View, Text } from 'react-native';
import { Title, Subtitle, P, ActionBtn } from '../../../ui/CampanarioComponents';

export default function NewsletterHomeScreen(props) {
	return (
		<View style={{paddingTop: '15%', paddingHorizontal: 15,}}>
			<Title>Newsletter Home</Title>
			<Title>Title</Title>
			<Title color='light' >Title (light style)</Title>
			<Title style={{color: 'red'}} >Title (custom styles)</Title>
			<Subtitle>Subtitle</Subtitle>
			<Subtitle color='light'>Subtitle (light style)</Subtitle>
			<P>Regular Text</P>
			<P color='light'>Regular Text (light style)</P>
			<P size='small'>Regular Text (small style)</P>
			<P size='large'>Regular Text (large style)</P>
			<ActionBtn title='Action Button' />
		</View>
	);
}
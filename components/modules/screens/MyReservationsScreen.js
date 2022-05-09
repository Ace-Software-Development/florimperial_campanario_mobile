import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservation } from '../../../utils/client';



export default function MyReservationsScreen(props) {

	useEffect(() => {
		getReservation();
	}, []);

	return (
		
		<ScreenContainer>
			<TopNav title='Mis Reservaciones' />

			<ScrollView>
				<ReservationCard
					area='Golf'
					sitio='Clases personlaizadas'
					hour='9:45'
					month='ABR'
					day='05'
				/>
				
			</ScrollView>
			
		</ScreenContainer>

	);
}


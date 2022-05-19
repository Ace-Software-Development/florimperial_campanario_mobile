import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations } from '../../../utils/client';
import { getMonthFormat } from '../../../utils/timeHelpers';
import { reservationMadeContext } from '../../../utils/context';


export default function MyReservationsScreen(props) {
	const [reservations, setReservations] = useState([]);
	const {reservationMade, setReservationMade} = useContext(reservationMadeContext);

	const areas = new Map();
	areas.set('f2oIvY3kdW', 'Golf');
	areas.set('BNgcGycR5Y', 'Raqueta');
	areas.set('d4XN05i9zx', 'Alberca');

	useEffect( () => {
		getReservations()
		.then(data => setReservations(data));	
	}, [reservationMade]);

	return (
		<ScreenContainer>
			<TopNav title='Mis Reservaciones' />

			<ScrollView>
				{reservations.map((reservation, i) =>{
					return (
					<ReservationCard key={i}
						area={areas.get(reservation.get('sitio').get('area').id)}
						sitio={reservation.get('sitio').get('nombre')}
						hour={reservation.get('fechaInicio').toISOString().slice(11,16)}
						month={getMonthFormat(reservation.get('fechaInicio'))}
						day={reservation.get('fechaInicio').getDate()}
					/>
					)
				}
				
				)}
			</ScrollView>
			
		</ScreenContainer>
	);
}


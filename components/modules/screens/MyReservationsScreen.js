import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations, getArea } from '../../../utils/client';
import { getMonthFormat } from '../../../utils/timeHelpers';
import { async } from 'parse/lib/browser/Storage';



export default function MyReservationsScreen(props) {
	const [reservations, setReservations] = useState([]);
	const areas = new Map();
	areas.set('f2oIvY3kdW', 'Golf');
	areas.set('BNgcGycR5Y', 'Raqueta');
	areas.set('d4XN05i9zx', 'Alberca');


	useEffect( async () => {
		const data = await getReservations();
		setReservations(data);	
	}, []);

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


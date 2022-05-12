import React, {useState, useEffect} from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations, getArea } from '../../../utils/client';
import { getMonthFormat } from '../../../utils/timeHelpers';
import { async } from 'parse/lib/browser/Storage';



export default function MyReservationsScreen(props) {
	const [reservations, setReservations] = useState([]);


	useEffect( () => {
		getReservations().then( data => {
			console.log(data);
			data.forEach(  i => {
				const area = i.get('sitio').get('area');
				getArea(area.id).then( dataArea => {
					const tempData = {
						area : dataArea[0].get('nombre'),
						sitio : i.get('sitio').get('nombre'),
						hour : i.get('fechaInicio').toISOString().slice(11,16),
						month : getMonthFormat(i.get('fechaInicio')),
						day : i.get('fechaInicio').getDate()
					}
					setReservations([...reservations, tempData])
				})
			}
			)
		})
		
	}, []);

	useEffect( () => {
		console.log(reservations);
	},[reservations])

	return (
		
		<ScreenContainer>
			<TopNav title='Mis Reservaciones' />

			<ScrollView>
				{reservations.map((reservation, i) =>{
					return (
					<ReservationCard key={i}
						area={reservation.area}
						sitio={reservation.sitio}
						hour={reservation.hour}
						month={reservation.month}
						day={reservation.day}
					/>
					)
				}
				
				)}
			</ScrollView>
			
		</ScreenContainer>

	);
}


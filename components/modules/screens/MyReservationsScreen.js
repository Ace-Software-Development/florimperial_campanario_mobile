// M009 M016
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations, getArea } from '../../../utils/client';
import { getMonthFormat, getTime } from '../../../utils/timeHelpers';
import { reservationMadeContext, multipleReservationMadeContext } from '../../../utils/context';


export default function MyReservationsScreen(props) {
	const [areas, setallAreas] = useState([]);
	const [reservations, setReservations] = useState([]);
	const {reservationMade, setReservationMade} = useContext(reservationMadeContext);
	const [multipleReservations, setMultipleReservations] = useState([]);
	const {multipleReservationMade, setMultipleReservationMade} = useContext(multipleReservationMadeContext);

	useEffect(() => {
		const data = new Map();
		getArea().then(data => setallAreas(data));
	}, []);

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
						hour={getTime(reservation.get('fechaInicio'))}
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


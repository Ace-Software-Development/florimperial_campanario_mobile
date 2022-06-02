import React, { useState, useEffect, useContext } from 'react';
import { ScrollView } from 'react-native';
import { ScreenContainer, ReservationCard } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations } from '../../../utils/client';
import { getReservations2 } from '../../../utils/client';
import { getMonthFormat } from '../../../utils/timeHelpers';
import { reservationMadeContext } from '../../../utils/context';
import { multipleReservationMadeContext } from '../../../utils/context';
import { getArea } from '../../../utils/client';


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

	useEffect(() => {
		getReservations2();
	}, []);


	/*useEffect( () => {
		getMultipleReservations()
		.then(data => setMultipleReservations(data));	
	}, [multipleReservationMade]);*/

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


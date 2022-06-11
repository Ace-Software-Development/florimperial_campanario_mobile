import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, Text } from 'react-native';
import { ScreenContainer, ReservationCard, ClinicaCard, Subtitle } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations } from '../../../utils/client';
import { getMultipleReservations } from '../../../utils/client';
import { getMonthFormat } from '../../../utils/timeHelpers';
import { reservationMadeContext } from '../../../utils/context';
import { multipleReservationMadeContext } from '../../../utils/context';
import { getArea } from '../../../utils/client';
import { getClinicas } from '../../../utils/client';


export default function MyReservationsScreen(props) {
	const [areas, setallAreas] = useState([]);
	const [reservations, setReservations] = useState([]);
	const [clinicas, setClinicas] = useState([]);
	const {reservationMade, setReservationMade} = useContext(reservationMadeContext);
	const {clinicaMade, setClinicaMade} = useContext(reservationMadeContext);

	useEffect(() => {
		const data = new Map();
		getArea().then(data => setallAreas(data));
	}, []);

	useEffect( () => {
		getReservations()
		.then(data => setReservations(data));	
	}, [reservationMade]);

	useEffect( () => {
		getClinicas()
		.then(data => setClinicas(data));	
	}, [clinicaMade]);

	for (let i of clinicas) console.log(i);
	return (
		<ScreenContainer>
			<TopNav title='Mis Reservaciones' />

			<ScrollView>
				<Subtitle>Clínicas</Subtitle>
				{clinicas.map((clinica, i) =>{
					return (
					<ClinicaCard key={i}
						area={areas.get(clinica.get('sitio').get('area').id)}
						sitio={clinica.get('sitio').get('nombre')}
						hour={clinica.get('horario')}
						dias={clinica.get('dias')}
					/>
					)
				}
				)}
				<Subtitle>Reservaciones</Subtitle>
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


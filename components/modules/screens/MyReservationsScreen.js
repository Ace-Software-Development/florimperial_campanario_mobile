// M009 M016
import React, { useState, useEffect, useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { ScreenContainer, ReservationCard, ClinicaCard, Subtitle } from '../../ui/CampanarioComponents';
import TopNav from '../../core/TopNav';
import { getReservations, getArea, getClinicas } from '../../../utils/client';
import { getMonthFormat, getTime } from '../../../utils/timeHelpers';
import { reservationMadeContext, multipleReservationMadeContext } from '../../../utils/context';



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
		.then(data => setClinicas(data)).catch((error) => console.error());	
	}, [clinicaMade]);

	return (
		<ScreenContainer>
			<TopNav title='Mis Reservaciones' />

			<ScrollView>
			<View marginBottom={100}>
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
						hour={getTime(reservation.get('fechaInicio'))}
						month={getMonthFormat(reservation.get('fechaInicio'))}
						day={reservation.get('fechaInicio').getDate()}
					/>
					)
				}
				)}
			</View>
			</ScrollView>
			
		</ScreenContainer>
	);
}


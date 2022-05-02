import Parse from "parse/react-native.js";

// Declaration of models
const RESERVACION_MODEL = Parse.Object.extend("Reservacion");
const RESERVACION_GOLF_MODEL = Parse.Object.extend("ReservacionGolf");
const AREA_MODEL = Parse.Object.extend("Area")
const SITIO_MODEL = Parse.Object.extend("Sitio")
const INVITADO_MODEL = Parse.Object.extend("Invitado")

export async function getAllAvailableReservationsGolf(){
	const currentTime = new Date();
	
	// Query all sitios belonging to Golf
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);
	areaQuery.equalTo('nombre', 'Golf');

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
	sitiosQuery.select("nombre");
	sitiosQuery.equalTo('eliminado', false);
	sitiosQuery.matchesQuery('area', areaQuery);
	sitiosQuery.include('area');

	// Query all reservations
	const reservationQuery = new Parse.Query(RESERVACION_MODEL);
	reservationQuery.select('fechaInicio', 'sitio', 'objectId');
	reservationQuery.equalTo('eliminado', false);
	reservationQuery.equalTo('estatus', 1);
	reservationQuery.matchesQuery('sitio', sitiosQuery);
	reservationQuery.include('sitio');

	let data = await reservationQuery.find();
	return data;
}

export async function createReservationGolf(dataReservation, dataReservationGolf, guests, callBackFunction) {
	try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		reservationObj.set('estatus', dataReservation.estatus);
		reservationObj.set('socio', userObj);
		await reservationObj.save();

		// Create GolfReservation entry
		let reservationGolfObj = new Parse.Object('ReservacionGolf');
		reservationGolfObj.set('carritosReservados', dataReservationGolf.carritosReservados);
		reservationGolfObj.set('cantidadHoyos', dataReservationGolf.cantidadHoyos);
		reservationGolfObj.set('reservacion', reservationObj);
		await reservationGolfObj.save();

		// Crer entrada de invitados
		for(let i = 0; i < guests.length; i++){
			let guestObj = new Parse.Object('Invitados');
			guestObj.set('nombre', guests[i]);
			guestObj.save();
		}

		callBackFunction();
	}catch(error) {
		console.log(error);
	}
}
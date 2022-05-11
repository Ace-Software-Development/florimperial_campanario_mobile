import Parse from "parse/react-native.js";
import { Guests } from "../components/ui/CampanarioComponents";

// Declaration of models
const RESERVACION_MODEL = Parse.Object.extend("Reservacion");
const AREA_MODEL = Parse.Object.extend("Area");
const SITIO_MODEL = Parse.Object.extend("Sitio");
const INVITADO_MODEL = Parse.Object.extend("Invitado");
const USER_MODEL = Parse.Object.extend("_User");

export async function getAllAvailableReservationsGolf(filterCoaches=false){
	// Query all sitios belonging to Golf
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);
	areaQuery.equalTo('nombre', 'Golf');

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
	sitiosQuery.select("nombre");
	sitiosQuery.equalTo('eliminado', false);
	sitiosQuery.notEqualTo('nombre', 'Tee practica');
	sitiosQuery.matchesQuery('area', areaQuery);
	sitiosQuery.include('area');

	// Query all reservations
	const reservationQuery = new Parse.Query(RESERVACION_MODEL);
	reservationQuery.equalTo('eliminado', false);
	reservationQuery.equalTo('estatus', 1);
	reservationQuery.matchesQuery('sitio', sitiosQuery);
	reservationQuery.include('sitio');
	reservationQuery.include('profesor');
	if (filterCoaches) {
		reservationQuery.exists('profesor');
	}
	let data = await reservationQuery.find();
	return data;
}

export async function getAllAvailableReservationsGolfTee(){
	// Query todos los sitios que pertenecen al tee de práctica
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);
	areaQuery.equalTo('nombre', 'Golf');

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
	sitiosQuery.equalTo('nombre', 'Tee practica');
	sitiosQuery.matchesQuery('area', areaQuery);
	sitiosQuery.include('area');

	// Query all reservations
	const reservationQuery = new Parse.Query(RESERVACION_MODEL);
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
		reservationObj.set('user', userObj);
		await reservationObj.save();

		// Create GolfReservation entry
		if(dataReservationGolf != undefined){
			let reservationGolfObj = new Parse.Object('ReservacionGolf');
			reservationGolfObj.set('carritosReservados', dataReservationGolf.carritosReservados);
			reservationGolfObj.set('cantidadHoyos', dataReservationGolf.cantidadHoyos);
			reservationGolfObj.set('reservacion', reservationObj);
			await reservationGolfObj.save();
		}

		// Crer entrada de invitados
		for(let i = 0; i < guests.length; i++){
			let guestObj = new Parse.Object('Invitado');
			guestObj.set('nombre', guests[i].username);
			guestObj.set('user', userObj);

			if (guests[i].id != "") {
				const user = new Parse.Object('_User');
				user.id = guests[i].id;
				guestObj.set('socioInvitado', user);
			}

			guestObj.save();
		}

		callBackFunction();
	}catch(error) {
		console.log(error);
	}
}

export async function getAllActiveUsers(){
	// Get current user loged in
	const userObj = await Parse.User.currentAsync();

	// Query all Users
	const userQuery = new Parse.Query(USER_MODEL);
	userQuery.equalTo('isAdmin', false);
	userQuery.notEqualTo('objectId', userObj.id);
	userQuery.descending('username');

	let data = await userQuery.find();
	return data;
}
/* Requirements:
	MMOD009
	MMOD012 */

import Parse from "parse/react-native.js";

// Declaration of models
const RESERVACION_MODEL = Parse.Object.extend("Reservacion");
const AREA_MODEL = Parse.Object.extend("Area");
const SITIO_MODEL = Parse.Object.extend("Sitio");
const USER_MODEL = Parse.Object.extend("_User");
const RUTINA_MODEL = Parse.Object.extend("Rutina");
const EJERCICIO_MODEL = Parse.Object.extend("Ejercicio");
const MULTIPLE_RESERVATION_MODEL = Parse.Object.extend("ReservacionMultiple");
const RESERVACION_GOLF_MODEL = Parse.Object.extend('ReservacionGolf');
const SUGERENCA_MODEL = Parse.Object.extend("Sugerencia");
const REGLAMENTO_MODEL = Parse.Object.extend("Reglamento");
const  NUMEROATENCION_MODEL = Parse.Object.extend("NumeroAtencion");




// Golf module
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
	/** 
	 * Retrieves all available golf reservations from DB 
	 */
	
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

export async function createReservationGolf(dataReservation, dataReservationGolf, guests, multipleReservation=false) {
	/**
	 * Saves reservation data in DB
	 * @param {array} dataReservation 
	 * @param {array} dataReservationGolf 
	 * @param {array} guests 
	 * @returns true if reservation data saved succesfully
	 * else @returns false
	 */
	try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		if (!multipleReservation) {
			reservationObj.set('user', userObj);
			reservationObj.set('estatus', dataReservation.estatus);
		}
		await reservationObj.save();

		// Update GolfReservation entry
		if(dataReservationGolf != undefined){
			const golfReservationQuery = new Parse.Query(RESERVACION_GOLF_MODEL);            
			golfReservationQuery.equalTo('reservacion', reservationObj);
			let reservationGolfObj = await golfReservationQuery.find();
			reservationGolfObj = reservationGolfObj.length ? reservationGolfObj[0] : null;
			reservationGolfObj.set('carritosReservados', dataReservationGolf.carritosReservados);
			reservationGolfObj.set('carritosReservados', dataReservationGolf.carritosReservados);
			reservationGolfObj.set('cantidadHoyos', dataReservationGolf.cantidadHoyos);
			reservationGolfObj.set('reservacion', reservationObj);
			await reservationGolfObj.save();
		}

		if (multipleReservation) {
			// Create Multiple Reservation entry
			let multipleReservationObj = new Parse.Object('ReservacionMultiple');
			multipleReservationObj.set('reservacion', reservationObj);
			multipleReservationObj.set('user', userObj);

			await multipleReservationObj.save();
		}

		// Crer entrada de invitados
		for(let i = 0; i < guests.length; i++){
			let guestObj = new Parse.Object('Invitado');
			let reservationGuest = new Parse.Object('ReservacionInvitado');
			guestObj.set('nombre', guests[i].username);
			guestObj.set('user', userObj);

			if (guests[i].id != "") {
				const user = new Parse.Object('_User');
				user.id = guests[i].id;
				reservationGuest.set('user', user);
			}

			reservationGuest.set('reservacion', reservationObj);
			reservationGuest.set('invitado', guestObj);

			guestObj.save();
			reservationGuest.save();
		}

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

// Gym module
// TODO Actualizar es status de la reservacion de 1 a 2 cuando se llene el cupo
export async function getAllAvailableReservationsGym(filterCoaches=false){
	/** 
	 * Retrieves all available gym reservations from DB 
	 */
	const userObj = await Parse.User.currentAsync();

	//Query all areas belonging to Gym
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);
	areaQuery.equalTo('nombre', 'Gimnasio');

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
	sitiosQuery.equalTo('nombre', 'Gimnasio');
	sitiosQuery.matchesQuery('area', areaQuery);
	sitiosQuery.include('area');

	// Query multiple reservations
	const multipleReservation = new Parse.Query(MULTIPLE_RESERVATION_MODEL);
	let multipleReservations = await multipleReservation.find();
	let ids = {};
	multipleReservations.forEach(reservation => {
		const id = reservation.get("reservacion").id;
		const userId = reservation.get("user").id;

		if(!(id in ids))
			ids[id] = {"count": 0, "reserved": false};
		ids[id].count++;
		if(userId == userObj.id)
			ids[id].reserved = true
	});
		
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
	let response = data.filter(object => {
		if (object.id in ids && ids[object.id].reserved)
			return false;
		const count = object.id in ids ? ids[object.id].count : 0;
		return object.get('maximoJugadores') > count;
	})
	return response;
}

export async function createReservationGym(dataReservation) {
	/**
	 * 
	 * @param {array} dataReservation 
	 * @returns true if reservation data saved succesfully
	 * else @returns false
	 */
	try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		
		// Create Multiple Reservation entry
		let multipleReservationObj = new Parse.Object('ReservacionMultiple');
		multipleReservationObj.set('reservacion', reservationObj);
		multipleReservationObj.set('user', userObj);

		await multipleReservationObj.save();

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

// Raqueta module
export async function getAllAvailableReservationsRaqueta(filterCoaches=false){
	/** 
	 * Retrieves all available raqueta reservations from DB 
	 */

	//Query all areas belonging to Raqueta
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);
	areaQuery.equalTo('nombre', 'Raqueta');

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
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

export async function createReservationRaqueta(dataReservation, guests) {
	/**
	 * 
	 * @param {array} dataReservation
	 * @param {array} guests 
	 * @returns true if reservation data saved succesfully
	 * else @returns false
	 */
	try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		reservationObj.set('estatus', dataReservation.estatus);
		reservationObj.set('user', userObj);
		await reservationObj.save();

		// Crer entrada de invitados
		for(let i = 0; i < guests.length; i++){
			let guestObj = new Parse.Object('Invitado');
			let reservationGuest = new Parse.Object('ReservacionInvitado');
			guestObj.set('nombre', guests[i].username);
			guestObj.set('user', userObj);

			if (guests[i].id != "") {
				const user = new Parse.Object('_User');
				user.id = guests[i].id;
				reservationGuest.set('user', user);
			}

			reservationGuest.set('reservacion', reservationObj);
			reservationGuest.set('invitado', guestObj);

			guestObj.save();
			reservationGuest.save();
		}

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

//Pool module
export async function getAllAvailableReservationsPool(filterCoaches=false){
	/** 
	 * Retrieves all available pool reservations from DB 
	 */

	 const userObj = await Parse.User.currentAsync();

	 //Query all areas belonging to Gym
	 const areaQuery = new Parse.Query(AREA_MODEL);
	 areaQuery.equalTo('eliminado', false);
	 areaQuery.equalTo('nombre', 'Alberca');
 
	 const sitiosQuery = new Parse.Query(SITIO_MODEL);
	 sitiosQuery.equalTo('nombre', 'Alberca');
	 sitiosQuery.matchesQuery('area', areaQuery);
	 sitiosQuery.include('area');
 
	 // Query multiple reservations
	 const multipleReservation = new Parse.Query(MULTIPLE_RESERVATION_MODEL);
	 let multipleReservations = await multipleReservation.find();
	 let ids = {};
	 multipleReservations.forEach(reservation => {
		 const id = reservation.get("reservacion").id;
		 const userId = reservation.get("user").id;
 
		 if(!(id in ids))
			 ids[id] = {"count": 0, "reserved": false};
		 ids[id].count++;
		 if(userId == userObj.id)
			 ids[id].reserved = true
	 });
		 
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
	 let response = data.filter(object => {
		 if (object.id in ids && ids[object.id].reserved)
			 return false;
		 const count = object.id in ids ? ids[object.id].count : 0;
		 return object.get('maximoJugadores') > count;
	 })
	 return response;
}

export async function createReservationPool(dataReservation) {
	/**
	 * 
	 * @param {array} dataReservation
	 * @returns true if reservation data saved succesfully
	 * else @returns false
	 */
	 try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		
		// Create Multiple Reservation entry
		let multipleReservationObj = new Parse.Object('ReservacionMultiple');
		multipleReservationObj.set('reservacion', reservationObj);
		multipleReservationObj.set('user', userObj);

		await multipleReservationObj.save();

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

// Salones module
export async function getAllAvailableReservationsSalones(filterCoaches=false){
	/** 
	 * Retrieves all available salones reservations from DB 
	 */

	 const userObj = await Parse.User.currentAsync();

	 //Query all areas belonging to Gym
	 const areaQuery = new Parse.Query(AREA_MODEL);
	 areaQuery.equalTo('eliminado', false);
	 areaQuery.equalTo('nombre', 'Salones');
 
	 const sitiosQuery = new Parse.Query(SITIO_MODEL);
	 sitiosQuery.equalTo('nombre', 'Salones');
	 sitiosQuery.matchesQuery('area', areaQuery);
	 sitiosQuery.include('area');
 
	 // Query multiple reservations
	 const multipleReservation = new Parse.Query(MULTIPLE_RESERVATION_MODEL);
	 let multipleReservations = await multipleReservation.find();
	 let ids = {};
	 multipleReservations.forEach(reservation => {
		 const id = reservation.get("reservacion").id;
		 const userId = reservation.get("user").id;
 
		 if(!(id in ids))
			 ids[id] = {"count": 0, "reserved": false};
		 ids[id].count++;
		 if(userId == userObj.id)
			 ids[id].reserved = true
	 });
		 
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
	 let response = data.filter(object => {
		 if (object.id in ids && ids[object.id].reserved)
			 return false;
		 const count = object.id in ids ? ids[object.id].count : 0;
		 return object.get('maximoJugadores') > count;
	 })
	 return response;
}

export async function createReservationSalones(dataReservation) {
	/**
	 * 
	 * @param {array} dataReservation
	 * @returns true if reservation data saved succesfully
	 * else @returns false
	 */
	 try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		// Update Reservation entry
		let reservationObj = new Parse.Object('Reservacion');
		reservationObj.set('objectId', dataReservation.objectId);
		
		// Create Multiple Reservation entry
		let multipleReservationObj = new Parse.Object('ReservacionMultiple');
		multipleReservationObj.set('reservacion', reservationObj);
		multipleReservationObj.set('user', userObj);

		await multipleReservationObj.save();

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

// General API calls
export async function getAllActiveUsers(){
	// Get current user loged in
	const userObj = await Parse.User.currentAsync();

	// Query all Users
	const userQuery = new Parse.Query(USER_MODEL);
	userQuery.equalTo('isAdmin', false);
	userQuery.equalTo('active', true);
	userQuery.notEqualTo('objectId', userObj.id);
	userQuery.descending('username');

	let data = await userQuery.find();
	return data;
}

export async function getReservations() {
	/**
	 * 
	 * @param none
	 * @returns array with all reservations made by user
	 * else @returns empty array
	 */
	const userObj = await Parse.User.currentAsync();

	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.select('nombre');
	areaQuery.equalTo('eliminado', false);

	const sitiosQuery = new Parse.Query(SITIO_MODEL);
	sitiosQuery.select('nombre');
	sitiosQuery.equalTo('eliminado', false);
	sitiosQuery.matchesQuery('area', areaQuery);
	sitiosQuery.include('area');

	const reservationQuery = new Parse.Query(RESERVACION_MODEL);
	reservationQuery.equalTo('user', userObj);
	reservationQuery.equalTo('eliminado', false);
	reservationQuery.equalTo('estatus', 2);
	reservationQuery.include('sitio');

	let data = await reservationQuery.find();

	const multipleReservationIdQuery = new Parse.Query(MULTIPLE_RESERVATION_MODEL);
	multipleReservationIdQuery.select('reservacion');
	multipleReservationIdQuery.equalTo('user', userObj);

	let reservacionMultipeId = await multipleReservationIdQuery.find();
	const reservacionIDS = [];

	for (let i of reservacionMultipeId) {
		reservacionIDS.push(i.get('reservacion').id);
	}

	for (let i of reservacionIDS) {		
		const multipleReservationQuery = new Parse.Query(RESERVACION_MODEL);
		multipleReservationQuery.equalTo('objectId', i);
		multipleReservationQuery.equalTo('eliminado', false);
		multipleReservationQuery.matchesQuery('sitio', sitiosQuery);
		multipleReservationQuery.include('sitio');

		let reservacion = await multipleReservationQuery.find();
	
		data.push(reservacion[0]);
	}

	data.sort(function(a, b) {
		return (a.get('fechaInicio').toISOString() > b.get('fechaInicio').toISOString()) ? -1 : ((a.get('fechaInicio').toISOString() < b.get('fechaInicio').toISOString()) ? 1 : 0);
	});

	return data; 
}

export async function getArea() {
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('eliminado', false);

	let data = await areaQuery.find();
	const areas = new Map();
	
	for (let i of data) {
		areas.set(i.id, i.get('nombre'));
	};
	return areas;
}

export async function getRoutines() {
	const userObj = await Parse.User.currentAsync();
	const routinesQuery = new Parse.Query(RUTINA_MODEL);
	routinesQuery.equalTo('user', userObj);
	routinesQuery.select('titulo');

	let data = await routinesQuery.find();
	return data;
}

export async function getTrainings(rutinaId){
	const rutinaQuery = new Parse.Query(RUTINA_MODEL);
	rutinaQuery.equalTo('objectId', rutinaId);
	const rutina = await rutinaQuery.first();

	const trainingsQuery = new Parse.Query(EJERCICIO_MODEL);
	trainingsQuery.equalTo('rutina', rutina);

	let data = await trainingsQuery.find();
	return data;
}


export async function postSuggestion(areaID, comment) {
	/**
	 * 
	 * @param {string} areaID
	 * @param {string} comment
	 * @returns true if suggestion data saved succesfully
	 * else @returns false
	 */
	 try{
		// Get current user loged in
		const userObj = await Parse.User.currentAsync();

		const areaQuery = new Parse.Query(AREA_MODEL);
		areaQuery.equalTo('objectId', areaID);
		areaQuery.equalTo('eliminado', false);

		const areaObj =  await areaQuery.find();

		// Update Reservation entry
		let suggestionObj = new Parse.Object('Sugerencia');
		
		suggestionObj.set('comentarios', comment);
		suggestionObj.set('area', areaObj[0]);
		suggestionObj.set('user', userObj);

		await suggestionObj.save();

		return true;
	}catch(error) {
		console.log(error);
		return false;
	}
}

/**
 * Retrieves all regulations from db
 * @param {string} module 
 * @returns {array} data
 */
 export async function getRegulations(module) {
	const areaQuery = new Parse.Query(AREA_MODEL);
	areaQuery.equalTo('nombre', module);
	
	const regulationsQuery = new Parse.Query(REGLAMENTO_MODEL);
	regulationsQuery.matchesQuery('area', areaQuery);
	regulationsQuery.include('area');

	const data = await regulationsQuery.find();
	return data;
}

/**
 * Retrieves support number from db
 * @returns {int} data
 */
 export async function getSupportNumber() {

	const supportNumberQuery = new Parse.Query(NUMEROATENCION_MODEL);
	supportNumberQuery.first();

	const data = await supportNumberQuery.find();
	const supportNumber = data[0].get('Numero');
	return supportNumber;
}

/* Requirements:
	MMOD009
	MMOD012 */

import Parse from "parse/react-native.js";

// Declaration of models
const RESERVACION_MODEL = Parse.Object.extend("Reservacion");
const AREA_MODEL = Parse.Object.extend("Area");
const SITIO_MODEL = Parse.Object.extend("Sitio");
const USER_MODEL = Parse.Object.extend("_User");
const MULTIPLE_RESERVATION_MODEL = Parse.Object.extend("ReservacionMultiple");


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

export async function createReservationGolf(dataReservation, dataReservationGolf, guests) {
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
	//reservationQuery.addDescending('fechaInicio');


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

	/*for (let i of data) {
		console.log(i.get('fechaInicio').toISOString());
		console.log('---------------------------------');
	}
	console.log('+++++++++++++++++++++1+++++++++++++++++++++')*/

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

/*export async function getReservations2() {
	const userObj = await Parse.User.currentAsync();

	const multipleReservationQuery = new Parse.Query(MULTIPLE_RESERVATION_MODEL);
	multipleReservationQuery.select('reservacion');
	multipleReservationQuery.equalTo('user', userObj);

	let reservacionMultipe = await multipleReservationQuery.find();
	const reservacionIDS = [];

	for (let i of reservacionMultipe) {
		reservacionIDS.push(i.get('reservacion').id);
	}

	const data = [];

	for (let i of reservacionIDS) {
		console.log(i);
		
		const areaQuery = new Parse.Query(AREA_MODEL);
		areaQuery.select('nombre');
		areaQuery.equalTo('eliminado', false);

		const sitiosQuery = new Parse.Query(SITIO_MODEL);
		sitiosQuery.select('nombre');
		sitiosQuery.equalTo('eliminado', false);
		sitiosQuery.matchesQuery('area', areaQuery);
		sitiosQuery.include('area');

		//const id = "7pGIho3tny";

		const reservationQuery = new Parse.Query(RESERVACION_MODEL);
		reservationQuery.equalTo('objectId', i);
		reservationQuery.equalTo('eliminado', false);
		reservationQuery.matchesQuery('sitio', sitiosQuery);
		reservationQuery.include('sitio');

		let reservacion = await reservationQuery.find();

		console.log(reservacion);
		console.log("******5********");
	

		//data.push(reservacion);
	}

	//return data;
}


export async function getMultipleReservations() {
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
	reservationQuery.addDescending('fechaInicio');


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

	for (let i of data) {
		console.log(i);
		console.log('----------------------------------------------')
	}
	console.log('++++++++++++++++++++++++++++2++++++++++++++++++++++++++++')

	return data; 
}*/
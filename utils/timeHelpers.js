const MONTHS_MAPPING = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
						'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const MONTHS_MAPPING_MIN = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 
						'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];


export function normalizeDayMonthFormat(dateObj){
	const formated = `${dateObj.getDate()} ${MONTHS_MAPPING[dateObj.getMonth()]}`;
	return formated;
}

export function normalizeYearMonthDayFormat(date) {
	return date.toString().slice(0, 13);
}

export function getMonthFormat(dateObj){
    const formated = `${MONTHS_MAPPING_MIN[dateObj.getMonth()]}`;
	return formated;
}

export function getTime(date) {
	let hours = date.getHours().toString();
	hours = hours.length==2 ? hours : `0${hours}`;
	let minutes = date.getMinutes().toString(); 
	minutes = minutes.length==2 ? minutes : `0${minutes}`;
	return `${hours}:${minutes}`
}

export const getCalendarOptions = data => {
	if (data.length == 0)
		return [];
	const dates = [];
	const seen = new Set();
	data.forEach(row => {
		const d = normalizeYearMonthDayFormat(row.datetime);
		if (!seen.has(d)){
			dates.push(row.datetime);
			seen.add(d);
		}
	});
	dates.sort( (a,b) => a.getFullYear()-b.getFullYear() || a.getMonth()-b.getMonth() || a.getDate()-b.getDate());
	return dates;
};

export function getISOString(data) {
	const year = data.getFullYear().toString();
	let month = data.getMonth().toString();
	month = month.length==2 ? month : `0${month}`;
	let day = data.getDate().toString();
	day = day.length==2 ? day : `0${day}`;
	let hours = data.getHours().toString();
	hours = hours.length==2 ? hours : `0${hours}`;
	let minutes = data.getMinutes().toString(); 
	minutes = minutes.length==2 ? minutes : `0${minutes}`;
	let offset = data.getTimezoneOffset()/60;
	offset = offset.toString();
	offset = offset.length==2 ? offset : `0${offset}`;
	return `${year}-${month}-${day}T${hours}:${minutes}:00Z`;
}

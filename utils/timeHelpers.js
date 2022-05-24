const MONTHS_MAPPING = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
						'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

const MONTHS_MAPPING_MIN = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 
						'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];


export function normalizeDayMonthFormat(dateObj){
	const formated = `${dateObj.getDate()} ${MONTHS_MAPPING[dateObj.getMonth()]}`;
	return formated;
}

export function getMonthFormat(dateObj){
    const formated = `${MONTHS_MAPPING_MIN[dateObj.getMonth()]}`;
	return formated;

}

export const getCalendarOptions = data => {
	if (data.length == 0)
		return [];

	const dates = [];
	const seen = new Set();
	data.forEach(row => {
		const d = row.datetime.split('T')[0];
		if (!seen.has(d)){
			const date = new Date(row.datetime);
			dates.push(date);
			seen.add(d);
		}
	});
	dates.sort( (a,b) => a.getFullYear()-b.getFullYear() || a.getMonth()-b.getMonth() || a.getDate()-b.getDate());
	return dates;
};

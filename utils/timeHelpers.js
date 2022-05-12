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
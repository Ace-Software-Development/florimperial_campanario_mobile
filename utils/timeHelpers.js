const MONTHS_MAPPING = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 
						'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export function normalizeDayMonthFormat(dateObj){
	const formated = `${dateObj.getDate()} ${MONTHS_MAPPING[dateObj.getMonth()]}`
	return formated;
}

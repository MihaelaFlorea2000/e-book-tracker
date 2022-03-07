export default function formatDateLong(date: string) {
    if (!date) return 'No Date'

    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(date).toLocaleDateString('en-UK', options);
}

/**
 * This post helped with the correct format for time zone
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
export const formatDateStringISO = (value:string):string => {
    if (!value) return '';
    let date =  new Date(value);

    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))

    return date.toISOString().split('T')[0];
}

/**
 * This post helped with the correct format for time zone
 * https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
 */
export const formatDateISO = (date:Date):string => {
    if (!date) return '';

    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))

    return date.toISOString().split('T')[0];
}
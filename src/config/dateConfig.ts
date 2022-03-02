export default function dateConfig(date: string) {
    if (!date) return 'No Date'

    const options:Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(date).toLocaleDateString('en-UK', options);
}
import moment from 'moment/moment'

export const validateDate = (value: string) => {
    const regex = /^\d{2}\.\d{2}\.\d{4}$/ // Регулярний вираз для формату число/місяць/рік

    if (!regex.test(value)) {
        return 'Incorrect date format. Use the day.month.year format.'
    }

    const date = moment(value, 'DD.MM.YYYY')

    if (!date.isValid()) {
        return 'Incorrect date.'
    }

    const day = date.date()
    const month = date.month() + 1 // Місяці в Moment.js починаються з 0, тому +1
    const year = date.year()
    const daysInMonth = date.daysInMonth()
    const monthsInYear = 12

    if (day > daysInMonth) {
        return 'Incorrect date..'
    }

    if (month > monthsInYear || year < 1900 || year > 2100) {
        return 'Incorrect month or year.'
    }

    return true
}
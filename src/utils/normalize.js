export function stringDateToTime(stringDate) {
    let d = new Date(stringDate)
    return `${d.getHours() < 10 ? '0' + d.getHours() : d.getHours()}:${d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()}`
}

export function stringDateToNormalizeDate(stringDate) {
    let d = new Date(stringDate)
    return `${d.getDate()}-${d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1}`
}

export function normalizeFilmTitle(title, ageRating) {
    return `${title} (${ageRating})`
}

export function datePlusHours(date, hours) {
    date.setTime(date.getTime() + (hours*60*60*1000))
    return date
}
import {request} from './api_index'

export function getAllRatings() {
    return request.get('films/ratings')
}

export function getFilms(duration, title, rating, dateSearchIndex) {
    return request.post('films', {
        duration,
        title,
        rating,
        dateSearchIndex
    })
}
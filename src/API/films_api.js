import {request} from './api_index'

export function getAllRatings() {
    return request.get('films/ratings')
}
export function getAllGenres() {
    return request.get('films/genres')
}

export function getFilms(duration, title, rating, genres, dateSearchIndex) {
    return request.post('films', {
        duration,
        title,
        rating,
        genres,
        dateSearchIndex
    })
}

export function updateFilm(id, title, description, duration, ageRating, genres) {
    return request.post('films/update_film', {
        id,
        title,
        description,
        duration,
        ageRating,
        genres
    })
}

export function putFilm(title, description, duration, ageRating, genres) {
    return request.post('films/put_film', {
        title,
        description,
        duration,
        ageRating,
        genres
    })
}

export function deleteFilm(filmId) {
    return request.get(`films/${filmId}`)
}
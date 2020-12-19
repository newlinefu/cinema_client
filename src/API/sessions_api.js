import {request} from './api_index'

export function getFilms() {
    return request.get('sessions/all_films')
}

export function getHalls() {
    return request.get('sessions/all_halls')
}

export function getSessions(date, price, film) {
    return request.post('sessions/get_all', {
        date,
        price,
        film
    })
}

export function putSession(hallId, filmId, price, time) {
    return request.post('sessions/put_sess', {
        hallId,
        filmId,
        price,
        time
    })
}

export function updateSession(sessId, hallId, filmId, price, time) {
    return request.post('sessions/update_sess', {
        sessId,
        hallId,
        filmId,
        price,
        time
    })
}

export function deleteSession(sessId) {
    return request.get(`sessions/delete_sess/${sessId}`)
}
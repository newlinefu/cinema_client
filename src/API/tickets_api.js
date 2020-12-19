import {request} from './api_index'

export function getTickets(sessionId) {
    return request.get(`tickets/${sessionId}`)
}

export function getSeats(hallId) {
    return request.get(`tickets/seats/${hallId}`)
}

export function buyTickets(sessionId, seatsColl) {
    return request.post('tickets/buy', {
        sessionId,
        seatsColl
    })
}

export function returnTickets(sessionId, seatsColl) {
    return request.post('tickets/return', {
        sessionId,
        seatsColl
    })
}
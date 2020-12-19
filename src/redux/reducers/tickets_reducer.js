import {asyncReducersDecorator, checkResponse} from '../utils/utils'
import {
    returnTickets,
    buyTickets,
    getTickets,
    getSeats
} from '../../API/tickets_api'


const SET_SEATS_LIST = 'SET_SEATS_LIST'
const SET_PRIMARY_SET_LIST = 'SET_PRIMARY_SET_LIST'

const defaultState = {
    seatsList: [],
    primarySeatsList: []
}

export default function ticketsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_SEATS_LIST): {
            return {
                ...state,
                seatsList: action.newSeatsList
            }
        }
        case(SET_PRIMARY_SET_LIST): {
            return {
                ...state,
                primarySeatsList: action.primarySeatsList
            }
        }
        default: {
            return state
        }
    }
}

function setSeatsListAC(newSeatsList) {
    return {
        type: SET_SEATS_LIST,
        newSeatsList
    }
}

function setPrimarySeatsListAC(primarySeatsList) {
    return {
        type: SET_PRIMARY_SET_LIST,
        primarySeatsList
    }
}

export const getTicketsFromServ = (sessionId) => {
    return async (dispatch, getState) => {
        const response = await getTickets(sessionId)
        if(checkResponse(response) && !response.data.errMessage) {
            const ticketsList = response.data
            const seatsWithTicketsList = getState().tickets.primarySeatsList.map(s => {
                const ticket = ticketsList.find(t => t.SEAT_HALL_ID === s.SEAT_HALL_ID)
                return {
                    seat: s,
                    ticket: ticket ? ticket.TICKET_ID : null
                }
            })
            dispatch(setSeatsListAC(seatsWithTicketsList))
            return Promise.resolve()
        } else {
            return Promise.reject(new Error(response.data.errMessage))
        }
    }
}

export const getSeatsFromServ = asyncReducersDecorator(
    (dispatch, data) => dispatch(setPrimarySeatsListAC(data)),
    getSeats
)

export const buyTicketsWithServ = asyncReducersDecorator(
    (dispatch, data) => {},
    buyTickets
)

export const returnTicketsWithServ = asyncReducersDecorator(
    (dispatch, data) => {},
    returnTickets
)






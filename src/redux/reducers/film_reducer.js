import {asyncReducersDecorator} from '../utils/utils'
import {getAllRatings, getFilms} from '../../API/films_api'

const SET_RATINGS = 'SET_RATINGS'
const SET_FILMS_SEARCH_DATA = 'SET_FILMS_SEARCH_DATA'
const SET_FILMS_DATA = 'SET_FILMS_DATA'

const defaultState = {
    ratingsData: [],
    filmsSearchData: {
        title: '',
        ratings: [],
        duration: [0, 300],
        dateTabIndex: 0
    },
    filmsData: []
}

export default function filmReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_RATINGS): {
            return {
                ...state,
                ratingsData: action.ratingsData
            }
        }
        case(SET_FILMS_SEARCH_DATA): {
            return {
                ...state,
                filmsSearchData: action.newFilmsSearchData
            }
        }
        case(SET_FILMS_DATA): {
            return {
                ...state,
                filmsData: action.newFilmsData
            }
        }
        default: {
            return state
        }
    }
}

function setRatingsAC(ratingsData) {
    return {
        type: SET_RATINGS,
        ratingsData
    }
}

function setFilmsDataAC(newFilmsData) {
    return {
        type: SET_FILMS_DATA,
        newFilmsData
    }
}

export function setFilmsSearchDataAC(newFilmsSearchData) {
    return {
        type: SET_FILMS_SEARCH_DATA,
        newFilmsSearchData
    }
}

export const getRatings = asyncReducersDecorator (
    (dispatch, data) => dispatch(setRatingsAC(data)),
    getAllRatings
)

export const getFilmsFromServ = asyncReducersDecorator (
    (dispatch, data) => dispatch(setFilmsDataAC(data)),
    getFilms
)
import {asyncReducersDecorator} from '../utils/utils'
import {
    getAllRatings,
    getFilms,
    getAllGenres,
    updateFilm,
    putFilm,
    deleteFilm
} from '../../API/films_api'

const SET_RATINGS = 'SET_RATINGS'
const SET_FILMS_SEARCH_DATA = 'SET_FILMS_SEARCH_DATA'
const SET_FILMS_DATA = 'SET_FILMS_DATA'
const SET_ALL_GENRES = 'SET_ALL_GENRES'
const SET_ACTUAL_FILM = 'SET_ACTUAL_FILM'

const defaultState = {
    ratingsData: [],
    genresData: [],
    filmsSearchData: {
        title: '',
        ratings: [],
        genres: [],
        duration: [0, 300],
        dateTabIndex: 0
    },
    filmsData: [],
    actualFilm: {}
}

export default function filmReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_RATINGS): {
            return {
                ...state,
                ratingsData: action.ratingsData
            }
        }
        case(SET_ACTUAL_FILM): {
            return {
                ...state,
                actualFilm: action.film
            }
        }
        case(SET_ALL_GENRES): {
            return {
                ...state,
                genresData: action.genresData
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
function setGenresAC(genresData) {
    return {
        type: SET_ALL_GENRES,
        genresData
    }
}

function setFilmsDataAC(newFilmsData) {
    return {
        type: SET_FILMS_DATA,
        newFilmsData
    }
}

export function setActualFilmAC(film) {
    return {
        type: SET_ACTUAL_FILM,
        film
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

export const getGenres = asyncReducersDecorator (
    (dispatch, data) => dispatch(setGenresAC(data)),
    getAllGenres
)

export const getFilmsFromServ = asyncReducersDecorator (
    (dispatch, data) => dispatch(setFilmsDataAC(data)),
    getFilms
)

export const updateFilmOnServ = asyncReducersDecorator(
    (dispatch, data) => {},
    updateFilm
)

export const putFilmToServ = asyncReducersDecorator(
    (dispatch, data) => {},
    putFilm
)

export const deleteFilmFromServ = asyncReducersDecorator(
    (dispatch, data) => {},
    deleteFilm
)
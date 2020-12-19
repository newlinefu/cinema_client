import {asyncReducersDecorator} from '../utils/utils'
import {
    getSessions,
    getFilms,
    getHalls,
    putSession,
    updateSession,
    deleteSession
} from '../../API/sessions_api'
import {
    normalizeFilmTitle,
    stringDateToNormalizeDate,
    stringDateToTime
} from '../../utils/normalize'

const SET_SESSIONS_LIST = 'SET_SESSIONS_LIST'
const SET_ALL_FILMS = 'SET_ALL_FILMS'
const SET_ALL_HALLS = 'SET_ALL_HALLS'

const defaultState = {
    sessionsList: [],
    hallsList: [],
    allFilmsList: []
}

export default function sessionsReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_SESSIONS_LIST): {
            return {
                ...state,
                sessionsList: action.normalizedSessionList
            }
        }
        case(SET_ALL_HALLS): {
            return {
                ...state,
                hallsList: action.hallsList
            }
        }
        case(SET_ALL_FILMS): {
            return {
                ...state,
                allFilmsList: action.filmsList
            }
        }
        default: {
            return state
        }
    }
}

function setSessionsListAC(newSessionsList) {
    /*
        SESS_ID(pin):1
        SESS_HALL(pin):1
        SESS_PRICE(pin):225
        SESS_TIME(pin):"2020-12-18T00:00:00.000Z"
        SESS_FILM_ID(pin):1
        SESS_FILM_TITLE(pin):"Назад в будущее"
        SESS_FILM_AR_INFO(pin):"12+"
     */

    const dateSet = new Set()
    const dateMap = new Map()

    //Записываем все имеющиеся даты без повторений в dateSet
    for (let s of newSessionsList) {
        dateSet.add(stringDateToNormalizeDate(s.SESS_TIME))
    }
    console.log(dateSet)
    //Сортируем все сеансы по датам. Внутрь дат записываем все имеющиеся фильмы без повторений
    for (let ds of dateSet) {
        const filmDateSet = new Set()

        for (let s of newSessionsList) {
            if (stringDateToNormalizeDate(s.SESS_TIME) === ds)
                filmDateSet.add(s)
        }

        dateMap.set(ds, filmDateSet)
    }

    //Итоговая коллекция
    const normalizedSessionList = {}

    for (let dm of dateMap.entries()) {
        let filmsObj = {}

        //Проходимся по каждому фильму и выбираем необходимые записи
        for (let fds of dm[1]) {
            filmsObj[normalizeFilmTitle(fds.SESS_FILM_TITLE, fds.SESS_FILM_AR_INFO)] = newSessionsList
                .filter(sess => sess.SESS_FILM_TITLE === fds.SESS_FILM_TITLE && dm[0] === stringDateToNormalizeDate(sess.SESS_TIME))
        }

        //Записываем по ключу даты объект фильма со всеми сеансами
        normalizedSessionList[dm[0]] = filmsObj
    }

    return {
        type: SET_SESSIONS_LIST,
        normalizedSessionList
    }
}

function setHallsAC(hallsList) {
    return {
        type: SET_ALL_HALLS,
        hallsList
    }
}

function setFilmsAC(filmsList) {
    return {
        type: SET_ALL_FILMS,
        filmsList
    }
}

export const getAllFilmsFromServ = asyncReducersDecorator(
    (dispatch, data) => dispatch(setFilmsAC(data)),
    getFilms
)

export const getAllHallsFromServ = asyncReducersDecorator(
    (dispatch, data) => dispatch(setHallsAC(data)),
    getHalls
)

export const getSessionsFromServ = asyncReducersDecorator(
    (dispatch, data) => dispatch(setSessionsListAC(data)),
    getSessions
)

export const putSessionOnServer = asyncReducersDecorator(
    (dispatch, data) => {
    },
    putSession
)

export const updateSessionOnServer = asyncReducersDecorator(
    (dispatch, data) => {
    },
    updateSession
)

export const deleteSessionFromServ = asyncReducersDecorator(
    (dispatch, data) => {
    },
    deleteSession
)


export function ratingsDataSelect(state) {
    return state.films.ratingsData
}
export function filmsSearchDataSelect(state) {
    return state.films.filmsSearchData
}

export function filmsDataSelect(state) {
    return state.films.filmsData
}

export function genresDataSelect(state) {
    return state.films.genresData
}

export function actualFilmSelect(state) {
    return state.films.actualFilm
}

export function allFilmsSelect(state) {
    return state.sessions.allFilmsList
}

export function allHallsSelect(state) {
    return state.sessions.hallsList
}

export function sessionsListSelect(state) {
    return state.sessions.sessionsList
}

export function seatsListSelect(state) {
    return state.tickets.seatsList
}
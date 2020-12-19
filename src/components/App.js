import React from 'react'
import CinemaHeader from './header/CinemaHeader'
import CinemaMain from './main/CinemaMain'
import {Route} from 'react-router-dom'
import ShowFilmContainer from './main/films/show_film/ShowFilmContainer'
import FilmFormRoute from './main/films/film_form/FilmFormRoute'
import SessionsContainer from './main/sessions/SessionsContainer'
import StatisticsContainer from './stat/StatisticsContainer'

export default function App() {
    return (
        <>
            <CinemaHeader/>
            <Route path={'/'} exact render={() => <CinemaMain/>}/>
            <Route path={'/show_film'} exact render={() => <ShowFilmContainer/>}/>
            <Route path={'/sessions'} exact render={() => <SessionsContainer filmId={null}/>}/>
            <Route path={'/stat'} exact render={() => <StatisticsContainer />}/>
            <FilmFormRoute/>
        </>
    )
}


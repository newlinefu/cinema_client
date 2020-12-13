import React from 'react'
import {Main} from 'grommet'
import FilmsSearchContainer from './films/films_search_form/FilmsSearchContainer'
import FilmsMainContainer from './films/films_main/FilmsMainContainer'

export default function CinemaMain() {
    return (
        <Main
            direction={'row'}
            pad={'medium'}
        >
            <FilmsSearchContainer />
            <FilmsMainContainer />
        </Main>

    )
}
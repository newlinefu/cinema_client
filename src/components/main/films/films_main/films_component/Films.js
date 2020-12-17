import React from 'react'
import {Box} from 'grommet'
import SingleFilm from './single_film/SingleFilm'
import {InProgress} from 'grommet-icons'

export default function Films({filmsData, loading, setActualFilm}) {
    return <Box
        direction={'row'}
        pad={'large'}
        wrap
    >
        {
            loading
                ? <InProgress
                    margin={{top: 'medium', bottom: 'medium'}}
                    size={'large'}
                    color={'brand'}
                />
                : filmsData.map(f => <SingleFilm
                    key={f.FILM_ID}
                    id={f.FILM_ID}
                    title={f.FILM_TITLE}
                    ageRating={f.AGE_RATING_INFO}
                    duration={f.FILM_MINUTE_DURATION}
                    genres={f.FILM_GENRES}
                    setActualFilm={() => setActualFilm(f)}
                />)
        }
    </Box>
}
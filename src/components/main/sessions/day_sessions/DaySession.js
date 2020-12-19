import React from 'react'
import {Box, Heading} from 'grommet'
import FilmSession from './films_session/FilmSession'


export default function DaySession({day, filmsSessionObj, filmsList, hallList, onSubmitChangeSession, onDeleteSessionAction}) {
    return (
        <Box direction={'row'}>
            <Box
                background={'brand'}
                height={'xsmall'}
                pad={'small'}
                width={'small'}
                alignContent={'center'}
                margin={{horizontal: 'medium'}}
                elevation={'small'}
            >
                <Heading level={2}>{day}</Heading>
            </Box>
            <Box
                direaction={'column'}
            >
                {
                    Object.entries(filmsSessionObj).map(fs => <FilmSession
                        filmTitle={fs[0]}
                        filmSessionData={fs[1]}
                        filmsList={filmsList}
                        hallList={hallList}
                        onSubmitChangeSession={onSubmitChangeSession}
                        onDeleteSessionAction={onDeleteSessionAction}
                    />)
                }
            </Box>
        </Box>
    )
}
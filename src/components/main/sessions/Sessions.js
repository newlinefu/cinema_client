import React from 'react'
import {Box} from 'grommet'
import DaySession from './day_sessions/DaySession'

export default function Sessions({sessionsList, filmsList, hallList, onSubmitChangeSession, onDeleteSessionAction}) {
    return <Box
        direction={'column'}
        margin={{top: 'medium'}}
    >
        {
            Object.entries(sessionsList).map(s => <DaySession
                day={s[0]}
                filmsSessionObj={s[1]}
                filmsList={filmsList}
                hallList={hallList}
                onSubmitChangeSession={onSubmitChangeSession}
                onDeleteSessionAction={onDeleteSessionAction}
            />)
        }
    </Box>
}
import React from 'react'
import SingleSession from './single_session/SingleSession'
import {Box, Heading} from 'grommet'
import {stringDateToTime} from '../../../../../utils/normalize'


export default function FilmSession({filmSessionData, filmTitle, filmsList, hallList, onSubmitChangeSession, onDeleteSessionAction}) {
    return (
        <Box
            direction={'column'}
            margin={{bottom: 'medium'}}
        >
            <Heading margin={{bottom: 'small'}} level={3}>{filmTitle}</Heading>
            <Box
                direction={'row'}
            >
                {
                    filmSessionData.map(fd => <SingleSession
                            time={stringDateToTime(fd.SESS_TIME)}
                            hall={fd.SESS_HALL}
                            film={fd.SESS_FILM_ID}
                            price={fd.SESS_PRICE}
                            filmsList={filmsList}
                            hallList={hallList}
                            sessionId={fd.SESS_ID}
                            primaryPrice={fd.SESS_PRIMARY_PRICE}
                            fullTime={fd.SESS_TIME}
                            onSubmitChangeSession={(values) => onSubmitChangeSession(values, fd.SESS_ID)}
                            onDeleteSessionAction={() => onDeleteSessionAction(fd.SESS_ID)}
                        />)
                }
            </Box>
        </Box>
    )
}
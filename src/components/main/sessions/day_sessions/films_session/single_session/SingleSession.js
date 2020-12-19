import React, {useState} from 'react'
import {Box, Button, Text} from 'grommet'
import {Close, Edit} from 'grommet-icons'
import SessionForm from '../../../session_form/SessionForm'
import {stringDateToTime} from '../../../../../../utils/normalize'
import SeatsContainer from "../../../../seats/SeatsContainer";

export default function SingleSession({
                                          price, film, time,
                                          fullTime, hall, filmsList,
                                          hallList, onSubmitChangeSession, primaryPrice,
                                          onDeleteSessionAction, sessionId
}) {
    const sessTimeObject = new Date(fullTime)

    const primaryChangeFormValue = {
        film: filmsList.find(f => f.FILM_ID === film).FILM_TITLE,
        hall: hall,
        price: primaryPrice,
        sessDate: `${sessTimeObject.getFullYear()}-${sessTimeObject.getMonth() + 1}-${sessTimeObject.getDate()}`,
        sessTime: stringDateToTime(sessTimeObject)
    }
    const textStyle = {
        pad: 'small',
        margin: {bottom: 'small'}
    }
    const [changeFormValues, setChangeFormValues] = useState(primaryChangeFormValue)
    const [isChangeFormOpen, setChangeFormOpen] = useState(false)

    const [isSeatsComponentOpen, setSeatsComponentOpen] = useState(false)

    return (
        <Box
            direction={'row'}
            margin={{right: 'medium'}}
            background={'light-3'}
            pad={'small'}
        >
            <Box
                direction={'column'}
                margin={{right: 'small'}}
                onClick={() => setSeatsComponentOpen(true)}
            >
                <Text {...textStyle}><b>Зал: </b>{hall}</Text>
                <Text {...textStyle}><b>Цена: </b>{price}</Text>
                <Text {...textStyle}><b>Время: </b>{time}</Text>
            </Box>
            <Box
                direction={'column'}
            >
                <Button icon={<Edit color={'neutral-1'}/>} onClick={() => setChangeFormOpen(true)}/>
                <Button icon={<Close color={'status-error'}/>} onClick={onDeleteSessionAction}/>
            </Box>
            {
                isChangeFormOpen
                    ? <SessionForm
                        onSubmit={({value}) => onSubmitChangeSession(value)}
                        setValue={setChangeFormValues}
                        closeModal={() => setChangeFormOpen(false)}
                        primaryValue={primaryChangeFormValue}
                        value={changeFormValues}
                        hallList={hallList}
                        filmsList={filmsList}
                    />
                    : null
            }
            {
                isSeatsComponentOpen
                    ? <SeatsContainer
                        hallId={hall}
                        sessionId={sessionId}
                        closeModal={() => setSeatsComponentOpen(false)}
                        price={price}
                    />
                    : null
            }
        </Box>
    )
}
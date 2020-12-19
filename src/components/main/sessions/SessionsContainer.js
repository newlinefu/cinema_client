import React, {useEffect, useState} from 'react'
import {
    sessionsListSelect,
    allFilmsSelect,
    allHallsSelect
} from '../../../redux/selectors/selectors'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import SessionSearchForm from './SessionSearchForm'
import {
    getAllFilmsFromServ,
    getAllHallsFromServ,
    getSessionsFromServ,
    deleteSessionFromServ,
    putSessionOnServer,
    updateSessionOnServer
} from '../../../redux/reducers/sessions_reducer'
import {Box} from 'grommet'
import Sessions from './Sessions'
import SessionForm from './session_form/SessionForm'
import {InProgress} from "grommet-icons";

function datePlusHours(date, hours) {
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000))
    return date
}

function SessionContainer({
                              filmId, getAllFilmsFromServ, getAllHallsFromServ,
                              getSessionsFromServ, sessionData, halls, films,
                              deleteSessionFromServ, putSessionOnServer,
                              updateSessionOnServer
                          }) {

    const defaultValue = {
        date: '',
        price: [0, 800]
    }
    const [values, setValues] = useState(defaultValue)
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    const addSessionPrimaryVal = {
        price: '',
        hall: '',
        film: '',
        sessDate: '',
        sessTime: ''
    }
    const [sessAddFormValues, setSessAddFormValues] = useState(addSessionPrimaryVal)
    const [isOpenAddSessForm, setOpenAddSessForm] = useState(false)

    useEffect(() => {

        const filmProm = getAllFilmsFromServ()
        const hallProm = getAllHallsFromServ()
        const sessProm = getSessionsFromServ(
            !!values.date ? datePlusHours(new Date(values.date), 3).toISOString() : '',
            values.price, filmId
        )

        Promise.all([filmProm, hallProm, sessProm])
            .catch(err => {
                console.log(err)
                alert(err.message)
            })

    }, [])

    useEffect(() => {
        manageRequests()
    }, [values])

    const [requestTimeOut, setRequestTimeOut] = useState(null)

    function manageRequests() {
        clearTimeout(requestTimeOut)
        setRequestTimeOut(
            setTimeout(
                () => {
                    setLoading(true)
                    getSessionsFromServ(
                        !!values.date ? datePlusHours(new Date(values.date), 3).toISOString() : '',
                        values.price,
                        filmId
                    )
                        .then(() => setLoading(false))
                },
                300
            )
        )
    }

    function onSubmitSessionAction(values, cb, id = null) {
        if (!values.sessDate || !values.sessTime) {
            alert('You must enter session time')
        } else {
            const filmId = films.find(f => f.FILM_TITLE === values.film).FILM_ID
            const sessionDateObject = new Date(values.sessDate)

            const sessDate = `${sessionDateObject.getFullYear()}-${sessionDateObject.getMonth() + 1}-${sessionDateObject.getDate()}T${values.sessTime}Z`

            cb(values.hall, filmId, sessDate, values.price, id)
        }
    }

    const onSubmitAddSession = (values) => onSubmitSessionAction(
        values,
        (hall, filmId, sessDate, price) => {
            putSessionOnServer(hall, filmId, price, sessDate)
                .then(() => manageRequests())
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
        }
    )

    const onSubmitChangeSession = (values, id) => onSubmitSessionAction(
        values,
        (hall, filmId, sessDate, price, id) => {
            updateSessionOnServer(id, hall, filmId, price, sessDate)
                .then(() => manageRequests())
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
        },
        id
    )

    function onDeleteSessionAction(sessId) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm('Are you sure to delete session ' + sessId + ' ?')) {
            deleteSessionFromServ(sessId)
                .then(() => manageRequests())
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
        }
    }


    return <Box
        direction={'row'}
    >
        {
            loading
                ? null
                : <>
                    <SessionSearchForm
                        history={history}
                        formValues={values}
                        setFormValues={setValues}
                        defaultValue={defaultValue}
                        openSessionForm={() => setOpenAddSessForm(true)}
                    />
                    <Sessions
                        sessionsList={sessionData}
                        hallList={halls}
                        filmsList={films}
                        onSubmitChangeSession={onSubmitChangeSession}
                        onDeleteSessionAction={onDeleteSessionAction}
                    />
                    {
                        isOpenAddSessForm
                            ? <SessionForm
                                onSubmit={({value}) => onSubmitAddSession(value)}
                                setValue={setSessAddFormValues}
                                closeModal={() => setOpenAddSessForm(false)}
                                primaryValue={addSessionPrimaryVal}
                                value={sessAddFormValues}
                                hallList={halls}
                                filmsList={films}
                            />
                            : null
                    }
                </>
        }


    </Box>
}

function mapStateToProps(state) {
    return {
        halls: allHallsSelect(state),
        films: allFilmsSelect(state),
        sessionData: sessionsListSelect(state)
    }
}

export default connect(mapStateToProps, {
    getAllFilmsFromServ,
    getAllHallsFromServ,
    getSessionsFromServ,
    deleteSessionFromServ,
    putSessionOnServer,
    updateSessionOnServer
})(SessionContainer)
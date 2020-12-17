import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {filmsDataSelect, filmsSearchDataSelect} from '../../../../../redux/selectors/selectors'
import Films from './Films'
import {getFilmsFromServ, setActualFilmAC} from '../../../../../redux/reducers/film_reducer'

function FilmsContainer({filmsData, filmsSearchData, getFilmsFromServ, setActualFilm}) {

    const [requestTimeOut, setRequestTimeOut] = useState(undefined)
    const [loading, setLoading] = useState(true)

    function manageRequests() {
        clearTimeout(requestTimeOut)
        setRequestTimeOut (
            setTimeout (
                () => {
                    setLoading(true)
                    getFilmsOnAction()
                },
                500
            )
        )
    }

    function getFilmsOnAction() {
        getFilmsFromServ(
            filmsSearchData.duration,
            filmsSearchData.title,
            filmsSearchData.ratings,
            filmsSearchData.genres,
            filmsSearchData.dateTabIndex
        )
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    useEffect(() => {
        manageRequests()
    }, [filmsSearchData])

    return (
        <Films
            loading={loading}
            filmsData={filmsData}
            setActualFilm={setActualFilm}
        />
    )
}

function mapStateToProps(state) {
    return {
        filmsData: filmsDataSelect(state),
        filmsSearchData: filmsSearchDataSelect(state)
    }
}

export default connect(mapStateToProps, {
    getFilmsFromServ,
    setActualFilm: setActualFilmAC
})(FilmsContainer)
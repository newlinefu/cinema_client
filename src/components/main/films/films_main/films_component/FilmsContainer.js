import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {filmsDataSelect, filmsSearchDataSelect} from '../../../../../redux/selectors/selectors'
import Films from './Films'
import {getFilmsFromServ} from '../../../../../redux/reducers/film_reducer'

function FilmsContainer({filmsData, filmsSearchData, getFilmsFromServ}) {

    const [requestTimeOut, setRequestTimeOut] = useState(undefined)

    function manageRequests() {
        clearTimeout(requestTimeOut)
        setRequestTimeOut (
            setTimeout (
                () => getFilmsOnAction(),
                500
            )
        )
    }

    function getFilmsOnAction() {
        getFilmsFromServ(
            filmsSearchData.duration,
            filmsSearchData.title,
            filmsSearchData.ratings,
            filmsSearchData.dateTabIndex
        )
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
            filmsData={filmsData}
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
    getFilmsFromServ
})(FilmsContainer)
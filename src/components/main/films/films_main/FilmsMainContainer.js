import React from 'react'
import {connect} from 'react-redux'
import {filmsSearchDataSelect} from '../../../../redux/selectors/selectors'
import {setFilmsSearchDataAC} from '../../../../redux/reducers/film_reducer'
import FilmsTabs from './FilmsTabs'

function FilmsMainContainer({filmsSearchData, setFilmsSearchData }) {
    return (
        <FilmsTabs
            filmsSearchData={filmsSearchData}
            setFilmsSearchData={setFilmsSearchData}
        />
    )
}

function mapStateToProps(state) {
    return {
        filmsSearchData: filmsSearchDataSelect(state)
    }
}

export default connect(mapStateToProps, {
    setFilmsSearchData: setFilmsSearchDataAC
})(FilmsMainContainer)
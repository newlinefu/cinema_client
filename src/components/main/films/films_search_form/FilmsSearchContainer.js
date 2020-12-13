import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import FilmsSearch from './FilmsSearch'
import {ratingsDataSelect, filmsSearchDataSelect} from '../../../../redux/selectors/selectors'
import {Text} from 'grommet'
import {getRatings, setFilmsSearchDataAC} from '../../../../redux/reducers/film_reducer'

function FilmsSearchContainer({getRatings, ratingsData, setFilmsSearchData, filmsSearchData}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        getRatings()
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }, [])

    if(loading)
        return <Text>...Loading...</Text>

    return <FilmsSearch
        formValues={filmsSearchData}
        setFormValues={setFilmsSearchData}
        ratingsData={ratingsData}
    />
}

function mapStateToProps(state) {
    return {
        ratingsData: ratingsDataSelect(state),
        filmsSearchData: filmsSearchDataSelect(state)
    }
}

export default connect(mapStateToProps, {

    getRatings,
    setFilmsSearchData: setFilmsSearchDataAC

})(FilmsSearchContainer)
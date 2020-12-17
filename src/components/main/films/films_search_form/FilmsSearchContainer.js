import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import FilmsSearch from './FilmsSearch'
import {
    ratingsDataSelect,
    filmsSearchDataSelect,
    genresDataSelect
} from '../../../../redux/selectors/selectors'
import {useHistory} from 'react-router-dom'
import {getRatings, getGenres, setFilmsSearchDataAC} from '../../../../redux/reducers/film_reducer'

function FilmsSearchContainer({getRatings, getGenres, ratingsData, setFilmsSearchData, filmsSearchData, genresData}) {
    const [loading, setLoading] = useState(true)
    const history = useHistory()

    useEffect(() => {
        setLoading(true)

        const ratProm = getRatings()
        const genreProm = getGenres()

        Promise.all([ratProm, genreProm])
            .then(() => setLoading(false))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })

    }, [])


    return <FilmsSearch
        formValues={filmsSearchData}
        setFormValues={setFilmsSearchData}
        ratingsData={ratingsData}
        genresData={genresData}
        loading={loading}
        history={history}
    />
}

function mapStateToProps(state) {
    return {
        ratingsData: ratingsDataSelect(state),
        filmsSearchData: filmsSearchDataSelect(state),
        genresData: genresDataSelect(state)
    }
}

export default connect(mapStateToProps, {

    getRatings,
    setFilmsSearchData: setFilmsSearchDataAC,
    getGenres

})(FilmsSearchContainer)
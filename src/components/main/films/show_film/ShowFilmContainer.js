import React from 'react'
import {connect} from 'react-redux'
import ShowFilm from './ShowFilm'
import {actualFilmSelect} from '../../../../redux/selectors/selectors'
import {deleteFilmFromServ} from '../../../../redux/reducers/film_reducer'
import {useHistory} from 'react-router-dom'

function ShowFilmContainer({actualFilm, deleteFilmFromServ}) {

    const history = useHistory()

    function deleteAction(filmId) {
        // eslint-disable-next-line no-restricted-globals
        if(confirm('Are you sure to delete this film?')) {
            deleteFilmFromServ(filmId)
                .then(() => history.push('/'))
                .catch(err => {
                    console.log(err)
                    alert(err.message)
                })
        }
    }

    function toEditModeClick() {
        history.push('/film_change')
    }

    return (
        <ShowFilm
            deleteAction={() => deleteAction(actualFilm.FILM_ID)}
            toEditModeClick={toEditModeClick}
            filmId={actualFilm.FILM_ID}
            title={actualFilm.FILM_TITLE}
            description={actualFilm.FILM_DESCRIPTION}
            duration={actualFilm.FILM_MINUTE_DURATION}
            genres={actualFilm.FILM_GENRES}
            rating={actualFilm.AGE_RATING_INFO}
        />
    )
}

function mapStateToProps(state) {
    return {
        actualFilm: actualFilmSelect(state)
    }
}
export default connect(mapStateToProps, {
    deleteFilmFromServ
})(ShowFilmContainer)


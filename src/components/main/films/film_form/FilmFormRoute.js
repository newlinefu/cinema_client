import React from 'react'
import {connect} from 'react-redux'
import {
    genresDataSelect,
    actualFilmSelect,
    ratingsDataSelect
} from '../../../../redux/selectors/selectors'
import {Route, useHistory} from 'react-router-dom'
import FilmForm from './FilmForm'
import {
    putFilmToServ,
    updateFilmOnServ
} from '../../../../redux/reducers/film_reducer'

function FilmFormRoute({genresData, actualFilm, ratingData, putFilmToServ, updateFilmOnServ}) {

    const history = useHistory()

    function onSubmitChange({value}) {
        updateFilmOnServ(
            actualFilm.FILM_ID,
            value.title,
            value.description,
            value.duration,
            ratingData.find(rd => rd.AGE_RATING_INFO === value.age_rating).AGE_RATING_ID,
            value.genres.map(v => genresData.find(d => d.GENRE_INFO === v).GENRE_ID)
        )
            .then(() => history.push('/'))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    function onSubmitPut({value}) {
        putFilmToServ(
            value.title,
            value.description,
            value.duration,
            ratingData.find(rd => rd.AGE_RATING_INFO === value.age_rating).AGE_RATING_ID,
            value.genres.map(v => genresData.find(d => d.GENRE_INFO === v).GENRE_ID)
        )
            .then(() => history.push('/'))
            .catch(err => {
                console.log(err)
                alert(err.message)
            })
    }

    return (
        <>
            <Route
                exact={true}
                path={'/film_change'}
                render={() => <FilmForm
                    genres={genresData}
                    onSubmit={onSubmitChange}
                    defaultValue={{
                        title: actualFilm.FILM_TITLE,
                        description: actualFilm.FILM_DESCRIPTION,
                        duration: actualFilm.FILM_MINUTE_DURATION,
                        age_rating: actualFilm.AGE_RATING_INFO,
                        genres: actualFilm.FILM_GENRES.map(g => g.GENRE_INFO)
                    }}
                    ratings={ratingData}
                />}
            />
            <Route
                exact={true}
                path={'/put_film'}
                render={() => <FilmForm
                    genres={genresData}
                    ratings={ratingData}
                    defaultValue={{
                        title: '',
                        description: '',
                        duration: '',
                        age_rating: '',
                        genres: ''
                    }}
                    onSubmit={onSubmitPut}
                />}
            />
        </>
    )
}

function mapStateToProps(state) {
    return {
        genresData: genresDataSelect(state),
        actualFilm: actualFilmSelect(state),
        ratingData: ratingsDataSelect(state)
    }
}

export default connect(mapStateToProps, {
    putFilmToServ,
    updateFilmOnServ
})(FilmFormRoute)
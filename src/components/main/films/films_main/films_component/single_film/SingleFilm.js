import React from 'react'
import {Button, Card, CardBody, CardFooter, CardHeader, Heading, Text} from 'grommet'
import {useHistory} from 'react-router-dom'

export default function SingleFilm({id, title, ageRating, duration, genres, setActualFilm}) {

    const history = useHistory()
    const onClickShowFilm = () => {
        setActualFilm()
        history.push('/show_film')
    }

    return (
        <Card
            height={{min: 'small', max: 'medium'}}
            width={'medium'}
            background={'brand'}
            elevation={'medium'}
            margin={'medium'}
            pad={'medium'}
        >
            <CardHeader pad={'medium'}>
                <Heading level={3}>{title}</Heading>
                <Text color={'light-5'}>({ageRating})</Text>
            </CardHeader>
            <CardBody pad={'medium'}>
                <Text>
                    <b>Длительность:</b> {duration} мин.
                </Text>
                <Text>
                    <b>Жанры: </b>
                    {
                        genres.map((g, index) => <span key={g.GENRE_ID}>
                            {g.GENRE_INFO}{index === genres.length - 1 || <>, </>}
                        </span>)
                    }
                </Text>
            </CardBody>
            <CardFooter
            >
                <Button
                    margin={{horizontal: 'auto'}}
                    onClick={onClickShowFilm}
                >
                    <ins>Посмотреть подробнее</ins>
                </Button>
            </CardFooter>
        </Card>
    )
}
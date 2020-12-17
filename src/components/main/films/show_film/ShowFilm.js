import React from 'react'
import {Box, Button, Heading, Paragraph, Text} from 'grommet'
import {Close, Edit} from 'grommet-icons'


const styles = {
    text: {
        margin: {vertical: 'xsmall'}
    }
}

export default function ShowFilm({title, description, duration, genres, rating, deleteAction, toEditModeClick}) {
    return (
        <Box
            pad={'large'}
            width={'large'}
        >
            <Heading color={'brand'}>
                {title}
            </Heading>
            <Box
                direction={'row'}
            >
                <Button icon={<Edit color={'neutral-1'}/>} margin={{right: 'small'}} onClick={toEditModeClick}/>
                <Button icon={<Close color={'status-error'}/>} margin={'small'} onClick={deleteAction}/>
            </Box>
            <Text
                {...styles.text}
            >
                <Text color={'brand'} weight={'bold'}>Длительность:</Text> {duration} минут
            </Text>
            <Text
                {...styles.text}
            >
                <Text color={'brand'} weight={'bold'}>Жанры: </Text>
                {
                    genres.map((g, index) => <span key={g.GENRE_ID}>
                            {g.GENRE_INFO}{index === genres.length - 1 || <>, </>}
                    </span>)
                }
            </Text>
            <Text
                {...styles.text}
            >
                <Text color={'brand'} weight={'bold'}>Возрастное ограничение:</Text> {rating}
            </Text>
            <Paragraph
                responsive={true}
            >
                {description}
            </Paragraph>
        </Box>
    )
}
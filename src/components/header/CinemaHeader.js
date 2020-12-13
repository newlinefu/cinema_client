import React from 'react'
import {Box, Heading} from 'grommet'

export default function CinemaHeader(props) {
    return (
        <Box
            as={'header'}
            justify={'between'}
            pad={'medium'}
            background={'brand'}
        >
            <Heading color={'light-1'}>MyCinema</Heading>
        </Box>
    )
}

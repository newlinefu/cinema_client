import React from 'react'
import {Box, Heading, Text} from 'grommet'


export default function Statistics({stat}) {
    return <Box pad={'medium'}>
        <Heading level={1} color={'brand'} align={'center'} pad={'medium'} margin={{vertical: 'medium'}}>Статистика</Heading>
        <Box
            direction={'column'}
        >
            {
                Object.entries(stat[0]).map(x => <Text margin={{vertical: 'medium'}}><b>{x[0]}:</b> {x[1]}</Text>)
            }
        </Box>
    </Box>
}
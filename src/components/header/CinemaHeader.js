import React from 'react'
import {Anchor, Box, Heading, Nav, Text} from 'grommet'
import {NavLink} from "react-router-dom";

export default function CinemaHeader(props) {
    return (
        <Box
            as={'header'}
            justify={'between'}
            pad={'medium'}
            background={'brand'}
            direction={'row'}
        >
            <Heading color={'light-1'}>MyCinema</Heading>
            <Box direction={'row'} pad={{horizontal: 'medium'}} gap={'medium'} align={'center'}>
                <NavLink to={'/'}>
                    <Text color={'light-1'}>Фильмы</Text>
                </NavLink>
                <NavLink to={'/sessions'}>
                    <Text color={'light-1'}>Сеансы</Text>
                </NavLink>
                <NavLink to={'/stat'}>
                    <Text color={'light-1'}>Статистика</Text>
                </NavLink>
            </Box>
        </Box>
    )
}

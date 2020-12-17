import React from 'react'
import {StatusGood, StatusCritical} from "grommet-icons"
import {Box, Text} from "grommet"


const ErrorMessage = ({message}) => {
    return (
        <Box direction={'row'} gap={'medium'}>
            <Text color={'status-error'}>
                {message}
            </Text>
            <StatusCritical color={'status-error'}/>
        </Box>
    )
}

const GoodMessage = () => {
    return (
        <Box justify={'between'}>
            <StatusGood color={'status-ok'}/>
        </Box>
    )
}

export function lengthValidatorCreate(minLength, maxLength) {
    return (value) => {
        const annotation = `
            Value must be more than ${minLength} symbols and more than ${minLength} symbols
        `
        if (returnLengthValCondition(value.length, minLength, maxLength)) {
            return {
                message: <ErrorMessage message={annotation}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
}

export function collLenCheck(value) {
    if(value && value.length >= 1) {
        return {
            message: <GoodMessage/>,
            status: 'info'
        }
    }
    return {
        message: <ErrorMessage message={`Required`}/>,
        status: 'error'
    }
}

export function numberValidatorCreate(minNum, maxNum) {
    return (value) => {
        const isNumRegexp = /^[0-9]+$/
        if (!isNumRegexp.test(value) || minNum > +value || +value > maxNum) {
            return {
                message: <ErrorMessage message={`Value must be number in [${minNum}, ${maxNum}] range`}/>,
                status: 'error'
            }
        }
        return {
            message: <GoodMessage />,
            status: 'info'
        }
    }
}


function returnLengthValCondition(len, minLen, maxLen) {
    return (minLen && len > maxLen) || (minLen && len < minLen)
}
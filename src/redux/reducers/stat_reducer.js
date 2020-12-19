import {asyncReducersDecorator} from '../utils/utils'
import {getStat} from '../../API/stat_api'

const SET_STAT = 'SET_STAT'


const defaultState = {
    stat: {}
}

export default function statReducer(state = defaultState, action) {
    switch (action.type) {
        case(SET_STAT): {
            return {
                ...state,
                stat: action.newStat
            }
        }
        default: {
            return state
        }
    }
}

function setStatAC(newStat) {
    return {
        type: SET_STAT,
        newStat
    }
}

export const getStatFromServ = asyncReducersDecorator(
    (dispatch, data) => dispatch(setStatAC(data)),
    getStat
)
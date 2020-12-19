import {request} from './api_index'

export function getStat() {
    return request.get('stat/')
}
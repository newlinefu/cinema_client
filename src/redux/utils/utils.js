export function checkResponse(response) {
    return response.status >= 200 && response.status < 300 && !response.data.errorMessage
}

export function asyncReducersDecorator(innerCB, requestCB) {
    return (...requestArgs) => {
        return async (dispatch, getState) => {
            const response = await requestCB(...requestArgs)
            if(checkResponse(response) && !response.data.errMessage) {
                innerCB(dispatch, response.data, getState)
                return Promise.resolve()
            } else {
                return Promise.reject(new Error(response.data.errMessage))
            }
        }
    }
}
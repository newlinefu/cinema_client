import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import filmReducer from './reducers/film_reducer.js'
import sessionsReducer from './reducers/sessions_reducer'
import ticketsReducer from './reducers/tickets_reducer'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    films: filmReducer,
    sessions: sessionsReducer,
    tickets: ticketsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export {store}
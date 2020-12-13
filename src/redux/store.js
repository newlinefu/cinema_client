import {createStore, applyMiddleware, combineReducers, compose} from 'redux'
import filmReducer from './reducers/film_reducer.js'
import thunkMiddleware from 'redux-thunk'

const reducers = combineReducers({
    films: filmReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export {store}
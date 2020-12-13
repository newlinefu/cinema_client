import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import {store} from './redux/store'
import {Grommet} from 'grommet'
import reportWebVitals from './reportWebVitals'

const theme = {
    colors: {
        brand: '#228BE6'
    },
    global: {
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px'
        }
    }
}

ReactDOM.render(
    <React.StrictMode>
        <Grommet theme={theme}>
            <Provider store={store}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </Provider>
        </Grommet>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

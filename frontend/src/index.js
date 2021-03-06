import React from 'react'
import ReactDOM from 'react-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/lib/integration/react'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { configureStore } from './redux/store'
require('dotenv').config()
const store = configureStore()
const persistor = persistStore(store)
ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor} store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

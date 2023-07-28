// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'

//Redux configuration
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { api } from '@/state/api.js'

export const store = configureStore({
    reducer: { [api.reducerPath]: api.reducer},
    middleware: (getDefault)=> getDefault().concat(api.middleware)
})

//setting up listeners
setupListeners(store.dispatch);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

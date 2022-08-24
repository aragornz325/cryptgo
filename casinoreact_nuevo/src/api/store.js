import {configureStore} from '@reduxjs/toolkit'
import initReducer from './reducers/initReducer'
import thunk from 'redux-thunk'

const store = configureStore({
    reducer: {
        init : initReducer
    },
    middleware : [
        thunk
    ]
})

export default store
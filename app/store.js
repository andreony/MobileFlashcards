import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import cardsReducer from '../features/cards/cardsSlice'
import logger from './middleware/logger'

export default configureStore({
    reducer:{
        cards: cardsReducer
    },
    middleware: [...getDefaultMiddleware()] //, logger
})
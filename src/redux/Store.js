import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/pages/userProfileSlice'

export const store = configureStore({
    reducer: {
        User: userReducer,
    },
})
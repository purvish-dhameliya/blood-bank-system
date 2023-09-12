import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice.js'


const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },

})

export default store

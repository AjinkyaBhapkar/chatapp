import { configureStore, current } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'


export const store = configureStore({
  reducer: {
    user: userReducer
  },
})
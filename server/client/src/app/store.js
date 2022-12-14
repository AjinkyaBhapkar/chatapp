import { configureStore, current } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import {persistReducer ,persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'

const persistConfig ={
  key:'chatApp',
  storage
}

const persistedReducer=persistReducer(persistConfig,userReducer)


export const store = configureStore({
  reducer:{
    user:persistedReducer,
  } ,
    
  middleware:[thunk]
})

export const persistor =persistStore(store)
import { configureStore } from '@reduxjs/toolkit'
import appReducer from '../featues/app/appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
})

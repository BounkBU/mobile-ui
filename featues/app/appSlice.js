import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  page: 'home',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
    },
  },
})

export const { setPage } = appSlice.actions

export const page = (state) => state.app.page

export default appSlice.reducer

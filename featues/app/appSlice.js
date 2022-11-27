import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import client from '../../client'

const initialState = {
  page: 'home',
  recommendedMenu: null,
}

export const fetchSubmitForm = createAsyncThunk(
  'app/fetchSubmitForm',
  async ({ facultyID, type, is_spicy, price }) => {
    const submitFormInput = {
      facultyID,
      type,
      is_spicy,
      price,
    }
    const { data } = await client.post('/form', submitFormInput)
    return data
  },
)

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

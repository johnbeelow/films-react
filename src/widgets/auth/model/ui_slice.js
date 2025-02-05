import { createSlice } from '@reduxjs/toolkit'
import { setUser } from './user_slice'

const initialState = {
  authModal: false,
  pagination: 1
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.authModal = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      const { token } = action.payload
      if (!token) return
      state.authModal = false
    })
  }
})

export const selectUiAuthModal = (state) => state.ui.authModal

export const { showModal } = uiSlice.actions
export default uiSlice.reducer

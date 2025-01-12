import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUserId } from '../../api/films_api'
import Cookies from 'js-cookie'

export const fetchUserId = createAsyncThunk('user/fetchUserId', async (userToken) => {
  const data = await getUserId(userToken)
  return { id: data.id, login: data.username }
})

const initialState = {
  email: Cookies.get('email') || null,
  token: Cookies.get('token') || null,
  login: Cookies.get('login') || null,
  id: Cookies.get('id') || null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, token } = action.payload
      state.email = email || state.email
      state.token = token || state.token

      if (email) Cookies.set('email', email, { expires: 7 })
      if (token) Cookies.set('token', token, { expires: 7 })
    },
    logoutUser: (state) => {
      state.email = null
      state.token = null
      state.login = null
      state.id = null

      Cookies.remove('email')
      Cookies.remove('token')
      Cookies.remove('login')
      Cookies.remove('id')
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserId.fulfilled, (state, action) => {
      const { id, login } = action.payload
      state.id = id || state.id
      state.login = login || state.login

      if (id) Cookies.set('id', id, { expires: 7 })
      if (login) Cookies.set('login', login, { expires: 7 })
    })
  }
})

export const selectUserEmail = (state) => state.user.email
export const selectUserToken = (state) => state.user.token
export const selectUserLogin = (state) => state.user.login
export const selectUserId = (state) => state.user.id

export const { setUser, logoutUser } = userSlice.actions
export default userSlice.reducer

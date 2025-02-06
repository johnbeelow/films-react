import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getFavoriteFilm, postFavoriteFilm } from '@shared/api/requests/films_api'

type FavoriteFilm = { id: number }

type initialStateTypes = {
  favoriteList: FavoriteFilm[]
  message: string
  status: string
}

type RequestPropsTypes = {
  userToken: string
  accountId: number
  filmId: number
  isFavorite: boolean
}

const initialState: initialStateTypes = {
  favoriteList: [],
  message: '',
  status: ''
}

export const fetchFavoriteFilms = createAsyncThunk(
  'favorites/fetchFavoriteFilms',
  async ({ userToken, accountId }: RequestPropsTypes) => {
    return await getFavoriteFilm(userToken, accountId)
  }
)

export const toggleFavoriteFilms = createAsyncThunk(
  'favorites/toggleFavoriteFilms',
  async ({ userToken, accountId, filmId, isFavorite }: RequestPropsTypes) => {
    return await postFavoriteFilm(userToken, accountId, filmId, isFavorite)
  }
)

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    initializeFavorites: (state, action) => {
      state.favoriteList = action.payload
    },
    clearMessage: (state) => {
      state.message = ''
      state.status = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteList = action.payload
      })
      .addCase(fetchFavoriteFilms.rejected, (state, action) => {
        state.favoriteList = action.payload as FavoriteFilm[]
        state.message = 'Упс, произошла ошибка, при добавление в избранное.'
        state.status = 'error'
      })
      .addCase(toggleFavoriteFilms.fulfilled, (state, action) => {
        if (!action.payload) return

        const { filmId, isFavorite } = action.payload

        if (isFavorite) {
          state.favoriteList.push({ id: filmId })
          state.message = 'Добавлено в избранное'
          state.status = 'success'
        }
        if (!isFavorite) {
          state.favoriteList = state.favoriteList.filter((film) => film.id !== filmId)
          state.message = 'Удалено из избранного'
          state.status = 'warning'
        }
      })
  }
})

export const selectFavoriteList = (state) => state.favorites.favoriteList
export const selectFavoriteMessage = (state) => state.favorites.message
export const selectFavoriteStatus = (state) => state.favorites.status

export const { clearMessage } = favoritesSlice.actions
export default favoritesSlice.reducer

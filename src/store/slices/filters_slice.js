import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getCurrentYear } from '../../utils/utils'
import { getGenres, getFilmsSorting, getSearchFilm } from '../../api/films_api'

const firstYear = 1980
const lastYear = getCurrentYear()
const intervalYears = lastYear - 10

export const fetchGenres = createAsyncThunk('filters/fetchGenres', getGenres)
export const fetchFilmsSorting = createAsyncThunk('filters/fetchFilmsSorting', getFilmsSorting)
export const fetchSearchFilm = createAsyncThunk('filters/fetchSearchFilm', getSearchFilm)

const initialState = {
  search: '',
  sorting: ['Популярности', 'По рейтингу'],
  years: [firstYear, lastYear],
  genres: [],
  selectedSorting: 'Популярности',
  selectedYears: [intervalYears, lastYear],
  selectedGenres: [],
  filmsPage: []
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.search = action.payload
    },
    setGenresData: (state, action) => {
      state.genres = action.payload
    },
    setFilmsPageData: (state, action) => {
      state.filmsPage = action.payload
    },
    setSelectedSorting: (state, action) => {
      state.selectedSorting = action.payload
    },
    setSelectedYears: (state, action) => {
      state.selectedYears = action.payload
    },
    setSelectedGenres: (state, action) => {
      state.selectedGenres = action.payload
    },
    toggleGenre: (state, action) => {
      const genreId = action.payload
      if (state.selectedGenres.includes(genreId)) {
        state.selectedGenres = state.selectedGenres.filter((id) => id !== genreId)
      } else {
        state.selectedGenres.push(genreId)
      }
    },
    resetAllFilters: (state) => {
      return {
        ...state,
        search: '',
        selectedSorting: 'Популярности',
        selectedYears: [intervalYears, lastYear],
        selectedGenres: []
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload
      })
      .addCase(fetchFilmsSorting.fulfilled, (state, action) => {
        state.filmsPage = action.payload
      })
      .addCase(fetchSearchFilm.fulfilled, (state, action) => {
        state.filmsPage = action.payload
      })
  }
})

export const selectFiltersSelectedSorting = (state) => state.filters.selectedSorting
export const selectFiltersSortingData = (state) => state.filters.sorting
export const selectFiltersFilmsPage = (state) => state.filters.filmsPage
export const selectFiltersSearchText = (state) => state.filters.search
export const selectFilterGenres = (state) => state.filters.genres
export const selectFilterYearsData = (state) => state.filters.years
export const selectFilterSelectedYears = (state) => state.filters.selectedYears

export const {
  setSearchText,
  setGenresData,
  setFilmsPageData,
  setSelectedSorting,
  setSelectedYears,
  setSelectedGenres,
  toggleGenre,
  resetAllFilters
} = filtersSlice.actions

export default filtersSlice.reducer

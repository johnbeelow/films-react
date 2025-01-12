import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user_slice'
import uiReducer from './slices/ui_slice'
import filtersReducer from './slices/filters_slice'
import favoritesReducer from './slices/favorites_slice'


export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    filters: filtersReducer,
    favorites: favoritesReducer
  }
})

import { configureStore } from '@reduxjs/toolkit'
import userReducer from '@widgets/auth/model/user_slice'
import uiReducer from '@widgets/auth/model/ui_slice'
import filtersReducer from '@features/filters/model/filters_slice'
import favoritesReducer from '@features/favorite_button/model/favorites_slice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    filters: filtersReducer,
    favorites: favoritesReducer
  }
})

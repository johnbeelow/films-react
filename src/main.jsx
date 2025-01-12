import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import { Root } from './routes/root'
import { ErrorPage } from './pages/error-page/error-page'
import { FilmPage } from './pages/films-page/films-page'
import { FilmDetailPage } from './pages/detail-page/film-detail-page'
import { loader as movieLoader } from './pages/detail-page/film-detail-page'
import { Provider } from 'react-redux'
import { store } from './store/store'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<FilmPage />} />
      <Route path='movie/:movieId' element={<FilmDetailPage />} loader={movieLoader} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)

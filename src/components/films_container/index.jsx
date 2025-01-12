import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Stack } from '@mui/material'

import styles from './style.module.css'
import { FilmCard } from '../film_card'
import { API_URL } from '../../config/config'
import { getFilmsSorting, getSearchFilm } from '../../api/films_api'
import {
  selectFiltersSelectedSorting,
  selectFiltersSortingData,
  selectFiltersFilmsPage,
  selectFiltersSearchText,
  setFilmsPageData
} from '../../store/slices/filters_slice'
import { selectUiCurrentPage } from '../../store/slices/ui_slice'
import { fetchFavoriteFilms } from '../../store/slices/favorites_slice'
import { selectUserId, selectUserToken } from '../../store/slices/user_slice'

const { POPULAR, RATING } = API_URL.SORTING

export const FilmsContainer = () => {
  const dispatch = useDispatch()
  const [url, setUrl] = useState(POPULAR)
  const selectedSorting = useSelector(selectFiltersSelectedSorting)
  const sorting = useSelector(selectFiltersSortingData)
  const filmsPage = useSelector(selectFiltersFilmsPage)
  const searchText = useSelector(selectFiltersSearchText)
  const currentPage = useSelector(selectUiCurrentPage)
  const accountId = useSelector(selectUserId)
  const userToken = useSelector(selectUserToken)

  const isPopularSorting = selectedSorting === sorting[0]
  const isLoading = !filmsPage?.results

  useEffect(() => {
    setUrl(isPopularSorting ? POPULAR : RATING)
  }, [isPopularSorting])

  useEffect(() => {
    dispatch(fetchFavoriteFilms(userToken, accountId))
  }, [dispatch, userToken, accountId])

  useEffect(() => {
    const fetchData = async () => {
      const data = searchText
        ? await getSearchFilm(userToken, searchText)
        : await getFilmsSorting(userToken, url, currentPage)

      dispatch(setFilmsPageData(data))
    }
    fetchData()
  }, [dispatch, url, currentPage, searchText, userToken])

  return (
    <Container>
      <Stack spacing={{ xs: 2, xl: 3 }} direction='row' useFlexGap className={styles.stack}>
        {isLoading
          ? Array.from(new Array(20)).map((_, index) => <FilmCard key={index} loading />)
          : filmsPage.results?.map((film) => (
              <FilmCard
                key={film.id}
                img={film.backdrop_path}
                title={film.title}
                rate={film.vote_average}
                id={film.id}
              />
            ))}
      </Stack>
    </Container>
  )
}

import { useEffect, useState } from 'react'
import styles from './style.module.css'
import { Container, Stack } from '@mui/material'
import { useAppSelector, useAppDispatch } from '@shared/hooks'

import { FilmCard } from '../film_card'
import { API_URL } from '@shared/api/constants/constants'
import { getFilmsSorting, getSearchFilm } from '@shared/api/requests/films_api'
import {
  selectFiltersSelectedSorting,
  selectFiltersSortingData,
  selectFiltersFilmsPage,
  selectFiltersSearchText,
  setFilmsPageData
} from '../../../../features/filters/model/filters_slice'

import { selectFilterCurrentPage } from '../../../../features/filters/model/filters_slice'
import { fetchFavoriteFilms } from '../../../../features/favorite_button/model/favorites_slice'
import { selectUserId, selectUserToken } from '../../../auth/model/user_slice'

const { POPULAR, RATING } = API_URL.SORTING

export const FilmsContainer = () => {
  const dispatch = useAppDispatch()
  const [url, setUrl] = useState(POPULAR)
  const selectedSorting = useAppSelector(selectFiltersSelectedSorting)
  const sorting = useAppSelector(selectFiltersSortingData)
  const filmsPage = useAppSelector(selectFiltersFilmsPage)
  const searchText = useAppSelector(selectFiltersSearchText)
  const currentPage = useAppSelector(selectFilterCurrentPage)
  const accountId = useAppSelector(selectUserId)
  const userToken = useAppSelector(selectUserToken)

  const isPopularSorting = selectedSorting === sorting[0]
  const isLoading = !filmsPage?.results

  useEffect(() => {
    setUrl(isPopularSorting ? POPULAR : RATING)
  }, [isPopularSorting])

  useEffect(() => {
    dispatch(
      fetchFavoriteFilms({
        userToken,
        accountId,
        filmId: 0,
        isFavorite: false
      })
    )
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
          ? Array.from(new Array(20)).map((_, index) => (
              <FilmCard key={index} isLoading img={''} title={''} rate={0} id={0} />
            ))
          : filmsPage.results?.map((film) => (
              <FilmCard
                key={film.id}
                img={film.backdrop_path}
                title={film.title}
                rate={film.vote_average}
                id={film.id}
                isLoading={false}
              />
            ))}
      </Stack>
    </Container>
  )
}

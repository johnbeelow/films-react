import { useState, useEffect } from 'react'
import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '@shared/hooks'
import { selectUserToken } from '@widgets/auth/model/user_slice'
import {
  toggleFavoriteFilms,
  clearMessage,
  selectFavoriteList,
  selectFavoriteMessage,
  selectFavoriteStatus
} from '../model/favorites_slice'

type FavoriteButtonProps = {
  filmId: number
  accountId: number
}

export const FavoriteButton = ({ filmId, accountId }: FavoriteButtonProps) => {
  const favoriteList = useAppSelector(selectFavoriteList)
  const message = useAppSelector(selectFavoriteMessage)
  const status = useAppSelector(selectFavoriteStatus)
  const userToken = useAppSelector(selectUserToken)
  const dispatch = useAppDispatch()
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    setIsFavorite(favoriteList.some((film) => film.id === filmId))
  }, [favoriteList, filmId])

  const handleClick = async () => {
    dispatch(toggleFavoriteFilms({ userToken, accountId, filmId, isFavorite: !isFavorite }))
  }

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') return
    dispatch(clearMessage())
  }

  return (
    <>
      <Tooltip title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'} placement='bottom'>
        <IconButton onClick={handleClick} color='secondary'>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Tooltip>

      <Snackbar
        open={!!message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity={status} variant='filled' sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

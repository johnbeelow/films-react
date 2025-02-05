import { IconButton, Tooltip, Snackbar, Alert } from '@mui/material'
import { FavoriteBorder, Favorite } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavoriteFilms, clearMessage } from '../model/favorites_slice'
import { useState, useEffect } from 'react'
import { selectFavoriteList, selectFavoriteMessage, selectFavoriteStatus } from '../model/favorites_slice'
import { selectUserToken } from '../../../widgets/auth/model/user_slice'

export const FavoriteButton = ({ filmId, accountId }) => {
  const favoriteList = useSelector(selectFavoriteList)
  const message = useSelector(selectFavoriteMessage)
  const status = useSelector(selectFavoriteStatus)
  const userToken = useSelector(selectUserToken)
  const dispatch = useDispatch()
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

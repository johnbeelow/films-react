import { DialogTitle, TextField, DialogActions, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/user_slice'
import { selectUserToken } from '../../../store/slices/user_slice'
import { fetchUserId } from '../../../store/slices/user_slice'

export const TokenModal = ({ onClose }) => {
  const [inputText, setInputText] = useState('')
  const userToken = useSelector(selectUserToken)
  const dispatch = useDispatch()

  const handleChangeInputText = (e) => {
    const token = e.target.value
    setInputText(token)
  }

  const handleSaveToken = () => {
    dispatch(setUser({ token: inputText }))
  }

  useEffect(() => {
    if (!userToken) return
    dispatch(fetchUserId(userToken))
  }, [userToken, dispatch])

  return (
    <>
      <DialogTitle sx={{ padding: 0 }}>Введите токен</DialogTitle>

      <Box component='form' onSubmit={handleSaveToken} sx={{ mx: 'auto' }}>
        <TextField
          id='token'
          label='Токен'
          variant='standard'
          sx={{ width: '450px' }}
          onChange={handleChangeInputText}
        />
        <DialogActions sx={{ padding: 0 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleSaveToken}>Запросить</Button>
        </DialogActions>
      </Box>
    </>
  )
}

import { DialogTitle, TextField, DialogActions, Button, Box } from '@mui/material'
import { useState, useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '@shared/hooks' 
import { setUser } from '../../model/user_slice'
import { selectUserToken } from '../../model/user_slice'
import { fetchUserId } from '../../model/user_slice' 

interface TokenModalProps {
  onClose: () => void
}

export const TokenModal = ({ onClose }: TokenModalProps) => {
  const [inputText, setInputText] = useState('')
  const userToken = useAppSelector(selectUserToken)
  const dispatch = useAppDispatch()

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <Button type='submit'>Запросить</Button>
        </DialogActions>
      </Box>
    </>
  )
}

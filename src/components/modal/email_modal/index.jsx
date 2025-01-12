import { DialogTitle, TextField, DialogActions, Button, Box } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../store/slices/user_slice'

export const EmailModal = ({ onClose }) => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()

  const handleChangeInputText = (e) => {
    const email = e.target.value
    setInputText(email)
  }

  const handleSaveEmail = (e) => {
    e.preventDefault()
    dispatch(setUser({ email: inputText }))
  }

  return (
    <>
      <DialogTitle sx={{ padding: 0 }}>Запросить токен</DialogTitle>
      <Box component='form' onSubmit={handleSaveEmail} sx={{ mx: 'auto' }}>
        <TextField
          id='email'
          label='Почта'
          variant='standard'
          sx={{ width: '450px' }}
          onChange={handleChangeInputText}
        />
        <DialogActions sx={{ padding: 0 }}>
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleSaveEmail}>Запросить</Button>
        </DialogActions>
      </Box>
    </>
  )
}

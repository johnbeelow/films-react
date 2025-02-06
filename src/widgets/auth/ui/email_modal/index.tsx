import { DialogTitle, TextField, DialogActions, Button, Box } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../model/user_slice'

interface EmailModalProps {
  onClose: () => void
}

export const EmailModal = ({ onClose }: EmailModalProps) => {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()

  const handleChangeInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSaveEmail = (e: React.FormEvent<HTMLFormElement>) => {
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
          <Button type='submit'>Запросить</Button>
        </DialogActions>
      </Box>
    </>
  )
}

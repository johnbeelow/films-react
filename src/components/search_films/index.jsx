import { TextField, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchText } from '../../store/slices/filters_slice'
import { selectFiltersSearchText } from '../../store/slices/filters_slice'

export const SearchFilms = () => {
  const dispatch = useDispatch()
  const searchText = useSelector(selectFiltersSearchText)

  const handleSearchChange = (e) => {
    const inputText = e.target.value
    dispatch(setSearchText(inputText))
  }

  return (
    <Box sx={{ paddingBottom: '20px' }}>
      <TextField
        id='search'
        label='Поиск'
        variant='outlined'
        size='small'
        fullWidth
        value={searchText}
        onChange={handleSearchChange}
      />
    </Box>
  )
}

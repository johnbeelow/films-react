import { useEffect } from 'react'
import { Checkbox, TextField, Autocomplete } from '@mui/material'
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleGenre, fetchGenres } from '../../store/slices/filters_slice'
import { selectFilterGenres } from '../../store/slices/filters_slice'
import { selectUserToken } from '../../store/slices/user_slice'

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export const FilterGenres = () => {
  const dispatch = useDispatch()
  const genres = useSelector(selectFilterGenres)
  const userToken = useSelector(selectUserToken)

  useEffect(() => {
    if (!userToken) return
    dispatch(fetchGenres(userToken))
  }, [dispatch, userToken])

  const handleGenreChange = (genreId) => {
    dispatch(toggleGenre(genreId))
  }

  return (
    <Autocomplete
      multiple
      options={genres}
      disableCloseOnSelect
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option.id}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
            onChange={() => handleGenreChange(option.id)}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => <TextField variant='standard' {...params} label='Жанры' />}
    />
  )
}

import { useEffect } from 'react'
import { Checkbox, TextField, Autocomplete } from '@mui/material'
import { CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, CheckBox as CheckBoxIcon } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '@shared/hooks'
import { toggleGenre, fetchGenres } from '../../model/filters_slice'
import { selectFilterGenres } from '../../model/filters_slice' 
import { selectUserToken } from '@widgets/auth/model/user_slice'

type Genres = { id: number; name: string }

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />
const checkedIcon = <CheckBoxIcon fontSize='small' />

export const FilterGenres = () => {
  const dispatch = useAppDispatch()
  const genres = useAppSelector(selectFilterGenres)
  const userToken = useAppSelector(selectUserToken)

  useEffect(() => {
    if (!userToken) return
    dispatch(fetchGenres(userToken))
  }, [dispatch, userToken])

  const handleGenreChange = (genreId: number) => {
    dispatch(toggleGenre(genreId))
  }

  return (
    <Autocomplete<Genres, true, false>
      multiple={true}
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

import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedSorting } from '../../store/slices/filters_slice'
import { selectFiltersSelectedSorting, selectFiltersSortingData } from '../../store/slices/filters_slice'

export const FilterSorting = () => {
  const dispatch = useDispatch()
  const selectedSorting = useSelector(selectFiltersSelectedSorting)
  const sorting = useSelector(selectFiltersSortingData)

  const handleChange = (e) => {
    dispatch(setSelectedSorting(e.target.value))
  }

  return (
    <FormControl fullWidth variant='standard'>
      <InputLabel>Сортировать по:</InputLabel>
      <Select value={selectedSorting} onChange={handleChange}>
        {sorting.map((param) => (
          <MenuItem key={param} value={param}>
            {param}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

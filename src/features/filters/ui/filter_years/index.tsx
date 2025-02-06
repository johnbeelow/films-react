import styles from './style.module.css'
import { Box, Slider, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedYears } from '../../model/filters_slice'
import { selectFilterSelectedYears, selectFilterYearsData } from '../../model/filters_slice'

export const FilterYears = () => {
  const dispatch = useDispatch()
  const selectedYears = useSelector(selectFilterSelectedYears)
  const years = useSelector(selectFilterYearsData)

  const minYear = years[0]
  const maxYear = years.at(-1)

  const handleChange = (e) => {
    dispatch(setSelectedYears(e.target.value))
  }

  return (
    <>
      <Typography className={styles.typography}>Год релиза:</Typography>

      <Box sx={{ width: 'auto' }}>
        <Slider
          value={selectedYears}
          onChange={handleChange}
          valueLabelDisplay='auto'
          size='small'
          min={minYear}
          max={maxYear}
        />
      </Box>
    </>
  )
}

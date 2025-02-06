import styles from './style.module.css'
import { Typography, IconButton, Stack } from '@mui/material'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { useDispatch } from 'react-redux'
import { resetAllFilters } from '../../model/filters_slice'

export const FiltersHeader = () => {
  const dispatch = useDispatch()

  const handleClearFiltersState = () => {
    dispatch(resetAllFilters())
  }

  return (
    <Stack direction='row' className={styles.stack}>
      <Typography className={styles.typography}>Фильтры</Typography>
      <IconButton className={styles.clearFiltersButton} onClick={handleClearFiltersState}>
        <RestartAltIcon />
      </IconButton>
    </Stack>
  )
}

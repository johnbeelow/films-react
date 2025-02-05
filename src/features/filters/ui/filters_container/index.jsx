import styles from './style.module.css'
import { Box, Paper } from '@mui/material'
import { FiltersHeader } from '../filters_header'

export const FiltersContainer = ({ children }) => {
  return (
    <Box className={styles.container} sx={{ display: { xs: 'none', sm: 'flex' } }}>
      <Paper elevation={4} className={styles.paper}>
        <FiltersHeader />
        <Box className={styles.filtersContent}>{children}</Box>
      </Paper>
    </Box>
  )
}

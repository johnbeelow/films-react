import styles from './style.module.css'
import { Pagination } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useSelector, useDispatch } from 'react-redux'
import { changePage, selectUiCurrentPage } from '../../store/slices/ui_slice'

export const FilterPagination = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(selectUiCurrentPage)

  const handlePageChange = (e, page) => {
    dispatch(changePage(page))
  }

  return (
    <Stack spacing={2} className={styles.stack}>
      <Pagination count={50} page={currentPage} onChange={handlePageChange} size='small' />
    </Stack>
  )
}

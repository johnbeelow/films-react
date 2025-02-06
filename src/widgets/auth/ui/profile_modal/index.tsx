import styles from './style.module.css'
import { Box, Dialog } from '@mui/material'
import { EmailModal } from '../email_modal'
import { TokenModal } from '../token_modal'
import { useAppSelector, useAppDispatch } from '@shared/hooks'
import { showModal } from '../../model/ui_slice'
import { selectUserEmail } from '../../model/user_slice'
import { selectUiAuthModal } from '../../model/ui_slice'

export const ProfileModal = () => {
  const dispatch = useAppDispatch()
  const userEmail = useAppSelector(selectUserEmail)
  const isModalOpen = useAppSelector(selectUiAuthModal)

  const handleClose = () => {
    dispatch(showModal(false))
  }

  return (
    <>
      <Dialog open={isModalOpen} onClose={handleClose} className={styles.modal}>
        <Box className={styles.modalContent}>
          {!userEmail ? <EmailModal onClose={handleClose} /> : <TokenModal onClose={handleClose} />}
        </Box>
      </Dialog>
    </>
  )
}

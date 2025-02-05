import CssBaseline from '@mui/material/CssBaseline'
import { Main } from '../../shared/ui/main'
import { AppBarHeader } from '../../widgets/app_bar_header/ui'
import { ThemeProvider } from '@mui/material'
import { themeBlack } from '../theme'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ProfileModal } from '../../widgets/auth/ui/profile_modal'
import { LoadingWrapper } from '../../shared/ui/loading_wrapper'

export const Root = () => {
  return (
    <ThemeProvider theme={themeBlack}>
      <CssBaseline />
      <Container maxWidth='xl'>
        <AppBarHeader />
        <ProfileModal />
        <LoadingWrapper>
          <Main>
            <Outlet />
          </Main>
        </LoadingWrapper>
      </Container>
    </ThemeProvider>
  )
}

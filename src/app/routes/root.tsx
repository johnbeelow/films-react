import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'
import { Container } from '@mui/material'
import { themeBlack } from '../theme'
import { AppBarHeader } from '@widgets/app_bar_header/ui'
import { ProfileModal } from '@widgets/auth/ui/profile_modal'
import { LoadingWrapper } from '@shared/ui/loading_wrapper'
import { Main } from '@shared/ui/main'

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

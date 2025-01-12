import CssBaseline from '@mui/material/CssBaseline'
import { Main } from '../components/main'
import { AppBarHeader } from '../components/app_bar_header'
import { ThemeProvider } from '@mui/material'
import { themeBlack } from '../theme'
import { Container } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ProfileModal } from '../components/modal/profile_modal'
import { LoadingWrapper } from '../components/loading_wrapper'

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

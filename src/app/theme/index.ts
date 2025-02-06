import { createTheme } from '@mui/material/styles'

export const themeBlack = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#b388ff'
    },
    secondary: {
      main: '#c28dea'
    },
    background: {
      default: '#0c0e10',
      paper: '#0c0e10'
    }
  }
})

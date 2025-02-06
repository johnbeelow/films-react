import { Box } from '@mui/material'

type LayoutProps = {
  children: React.ReactNode
}

export const Main = ({ children }: LayoutProps) => {
  return <Box sx={{ display: 'flex' }}>{children}</Box>
}

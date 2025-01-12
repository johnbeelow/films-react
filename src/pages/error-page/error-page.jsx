import { useRouteError } from 'react-router-dom'
import { Container } from '@mui/material'

export function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <Container>
      <div>
        <h1>Oops!</h1>
        <p>Произошла непредвиденная ошибка.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </Container>
  )
}



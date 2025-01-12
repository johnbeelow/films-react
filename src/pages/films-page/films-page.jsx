import { FiltersContainer } from '../../components/filters_container'
import { FilmsContainer } from '../../components/films_container'
import { useSelector } from 'react-redux'

export const FilmPage = () => {
  const userId = useSelector((state) => state.user.id)
  const userLogin = useSelector((state) => state.user.login)
  const isAuth = userId && userLogin

  return (
    <>
      {isAuth ? <FiltersContainer /> : ''}
      {isAuth ? <FilmsContainer /> : ''}
    </>
  )
}

import { SideBar } from '../../widgets/side_bar/ui'
import { FilmsContainer } from '../../widgets/films_gallery/ui/films_container'
import { useSelector } from 'react-redux'

export const FilmPage = () => {
  const userId = useSelector((state) => state.user.id)
  const userLogin = useSelector((state) => state.user.login)
  const isAuth = userId && userLogin

  return (
    <>
      {isAuth ? <SideBar /> : ''}
      {isAuth ? <FilmsContainer /> : ''}
    </>
  )
}

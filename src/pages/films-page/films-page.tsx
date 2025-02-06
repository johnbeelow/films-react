import { FilmsContainer } from '@widgets/films_gallery/ui/films_container'
import { useAppSelector } from '@shared/hooks'
import { SideBar } from '@widgets/side_bar/ui'

export const FilmPage = () => {
  const userId = useAppSelector((state) => state.user.id)
  const userLogin = useAppSelector((state) => state.user.login)
  const isAuth = userId && userLogin

  return (
    <>
      {isAuth ? <SideBar /> : ''}
      {isAuth ? <FilmsContainer /> : ''}
    </>
  )
}

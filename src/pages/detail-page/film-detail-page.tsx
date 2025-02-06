import { useLoaderData } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FavoriteButton } from '@features/favorite_button/ui'
import { getFilmInfo } from '@shared/api/requests/films_api'
import { API_URL } from '@shared/api/constants/constants'
import { getYear } from '@shared/lib/date/get_year/get_year'
import { getListLimit } from '@shared/lib/text/get_list_limit/get_list_limit'
import { store } from '@app/store/store'
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow
} from '@mui/material'

const { INFO, CREDITS } = API_URL.DETAILS

export const FilmDetailPage = () => {
  const { info, credits } = useLoaderData()

  const details = {
    poster: `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${info.poster_path}`,
    title: info.title,
    year: getYear(info.release_date),
    overview: info.overview,
    actors: getListLimit(
      credits.cast.filter((actor) => actor.known_for_department === 'Acting').map((actor) => actor.name)
    ),
    rows: [
      { title: 'Страна', info: info.production_countries[0]?.name || '-' },
      { title: 'Год', info: getYear(info.release_date) },
      { title: 'Жанр', info: info.genres.map((genre) => genre.name).join(', ') },
      { title: 'Режиссер', info: getCreditsInfo(credits.crew, 'Directing') },
      { title: 'Сценарий', info: getCreditsInfo(credits.crew, 'Writing') },
      { title: 'Бюджет', info: `$ ${info.budget.toLocaleString()}` },
      { title: 'Доход', info: `$ ${info.revenue.toLocaleString()}` },
      { title: 'Продолжительность', info: `${info.runtime} мин` }
    ]
  }

  return (
    <Container>
      <Stack
        spacing={{ xs: 2, xl: 3 }}
        direction='row'
        useFlexGap
        sx={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
      >
        <Box
          sx={{
            backgroundColor: '#424242',
            minWidth: '300px',
            height: '400px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <img
            src={details.poster}
            alt=''
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Box
          sx={{
            width: '928px',
            minWidth: '390px',
            height: 'auto',
            flexDirection: 'column',
            padding: '15px',
            rowGap: '20px',
            display: 'flex'
          }}
        >
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Typography variant='h4'>
              {details.title} ({details.year})
            </Typography>
            <FavoriteButton filmId={info.id} accountId={0} />
          </Box>

          <Link to={'/'}>
            <IconButton
              style={{
                width: '30px',
                height: '30px'
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          </Link>

          <Box>
            <Typography variant='h5'>В ролях:</Typography>
            {details.actors}
          </Box>

          <Box>
            <Typography variant='h5'>Описание:</Typography>
            <Typography variant='body1'>{details.overview}</Typography>
          </Box>

          <Typography variant='h5'>Детали:</Typography>
          <DetailsTable rows={details.rows} />
        </Box>
      </Stack>
    </Container>
  )
}

const DetailsTable = ({ rows }) => {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.info}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const getCreditsInfo = (crew, job) =>
  crew
    .filter((person) => person.job === job)
    .map((person) => person.name)
    .join(', ') || '-'

export const loader = async ({ params }) => {
  const state = store.getState()
  const userToken = state.user.token

  if (!userToken) {
    console.warn(`Отсутствует ${userToken}, запрос не выполнен`)
    return { info: null, credits: null }
  }

  const info = await getFilmInfo(userToken, params.movieId, INFO)
  const credits = await getFilmInfo(userToken, params.movieId, CREDITS)

  return { info, credits }
}

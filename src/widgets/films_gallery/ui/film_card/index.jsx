import styles from './style.module.css'
import { Card, CardMedia, CardActionArea, Skeleton, Box, CardContent, Typography, CardActions } from '@mui/material'
import { Link } from 'react-router-dom'
import { FavoriteButton } from '../../../../features/favorite_button/ui'
import { useState } from 'react'

import { formatRating } from '../../../../shared/lib/text/format_rating/format_rating'
import { formatTitle } from '../../../../shared/lib/text/format_title/format_title'

export const FilmCard = ({ img, title, rate, isLoading = false, id }) => {
  const [isLoadedImage, setIsLoadedImage] = useState(false)

  return (
    <Card className={styles.card} sx={{ minWidth: { xs: '340px', sm: '300px', md: '260px' } }}>
      <CardActionArea>
        <Box className={`${styles.imageContainer} ${isLoadedImage ? styles.imageLoaded : ''}`}>
          {isLoading ? (
            <Skeleton sx={{ height: '380px' }} animation={'wave'} variant='rectangular' />
          ) : (
            <Link to={`movie/${id}`}>
              <CardMedia
                component='img'
                height='380px'
                image={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${img}`}
                alt={title}
                className={`${styles.cardMedia} ${isLoadedImage ? styles.cardMediaVisible : ''}`}
                onLoad={() => setIsLoadedImage(true)}
              />
            </Link>
          )}
        </Box>
      </CardActionArea>

      <Box className={styles.cardActions}>
        <CardContent>
          {isLoading ? (
            <Skeleton animation={'wave'} height={20} width='120px' style={{ marginBottom: 6 }} />
          ) : (
            <Typography className={styles.cardContent}>{formatTitle(title)}</Typography>
          )}
          {isLoading ? (
            <Skeleton animation={'wave'} height={20} width='60px' />
          ) : (
            <Typography className={styles.cardSubtitle}>{formatRating(rate)}</Typography>
          )}
        </CardContent>
        <CardActions>{isLoading && id ? null : <FavoriteButton filmId={id} />}</CardActions>
      </Box>
    </Card>
  )
}

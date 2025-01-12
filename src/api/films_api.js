const fetchOptionsGet = (userToken) => ({
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${userToken}`,
  },
});

export const getFilmInfo = async (userToken, id, url) => {
  const fetchUrl = `https://api.themoviedb.org/3/movie/${id}${url}`

  try {
    const response = await fetch(fetchUrl, fetchOptionsGet(userToken))
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getGenres = async (userToken) => {
  const url = 'https://api.themoviedb.org/3/genre/movie/list?language=ru'

  try {
    const response = await fetch(url, fetchOptionsGet(userToken))
    const data = await response.json()
    return data.genres
  } catch (err) {
    console.error(err)
  }
}

export const getFilmsSorting = async (userToken, url, page) => {
  const urlSorting = `${url}=${page}`

  try {
    const response = await fetch(urlSorting, fetchOptionsGet(userToken))
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

export const getUserId = async (userToken) => {
  const fetchUrl = `https://api.themoviedb.org/3/account/account_id`;
  try {
    const response = await fetch(fetchUrl, fetchOptionsGet(userToken));
    const data = await response.json();

    if (!response.ok) {
      console.error('Ошибка API:', data);
      return {}; 
    }

    return data;
  } catch (err) {
    console.error('Ошибка запроса getUserId:', err);
    return {};
  }
};

export const postFavoriteFilm = async (userToken, accountId, filmId, isFavorite) => {
  const fetchUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite`

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        media_type: 'movie',
        media_id: filmId,
        favorite: isFavorite
      })
    })
    await response.json()
    return { filmId, isFavorite }
  } catch (err) {
    console.error(err)
  }
}

export const getFavoriteFilm = async (userToken, accountId) => {
  const fetchUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies`
  try {
    const response = await fetch(fetchUrl, fetchOptionsGet(userToken))
    const data = await response.json()
    return data.results
  } catch (err) {
    console.error(err)
  }
}

export const getSearchFilm = async (userToken, search) => {
  const fetchUrl = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=ru-RU&page=1`
  try {
    const response = await fetch(fetchUrl, fetchOptionsGet(userToken))
    const data = await response.json()
    return data
  } catch (err) {
    console.error(err)
  }
}

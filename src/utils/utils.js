export const getYear = (date) => new Date(date).getFullYear()

export const getCurrentYear = () => new Date().getFullYear()

export const getListLimit = (data) => {
  return data.length > 10 ? `${data.slice(0, 10).join(', ')}...` : data.join(', ') || '-'
}

export const formatRating = (rate) => {
  return `Рейтинг: ${rate ? rate.toFixed(1) : '-'}`
}

export const formatTitle = (title) => {
  if (!title) return '-'
  return title.length > 35 ? `${title.substring(0, 28)}...` : title
}

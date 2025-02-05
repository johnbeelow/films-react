export const formatRating = (rate) => {
    return `Рейтинг: ${rate ? rate.toFixed(1) : '-'}`
  }
export const formatRating = (rate: number) => {
    return `Рейтинг: ${rate ? rate.toFixed(1) : '-'}`
  }
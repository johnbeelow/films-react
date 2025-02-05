export const getListLimit = (data) => {
    return data.length > 10 ? `${data.slice(0, 10).join(', ')}...` : data.join(', ') || '-'
  }
  
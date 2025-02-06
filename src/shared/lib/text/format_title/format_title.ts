export const formatTitle = (title: string) => {
    if (!title) return '-'
    return title.length > 35 ? `${title.substring(0, 28)}...` : title
  }
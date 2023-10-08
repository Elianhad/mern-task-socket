const dateFormat = (date) => {
  const dateToFormat = new Date(date)
  const option = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return dateToFormat.toLocaleDateString('es-Es', option)
}
export default dateFormat
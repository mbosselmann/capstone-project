export default function formatDate(date) {
  const dateString = date.toString()
  const day = dateString.slice(8, 10)
  const month = dateString.slice(5, 7)
  const year = dateString.slice(0, 4)
  return day + '.' + month + '.' + year
}

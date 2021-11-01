export default function formatDate(date) {
  const today = date
  const day = today.toString().slice(8, 10)
  const month = today.toString().slice(5, 7)
  const year = today.toString().slice(0, 4)
  const formatToday = day + '.' + month + '.' + year
  return formatToday
}

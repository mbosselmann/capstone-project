export default function getToday() {
  const date = new Date()
  const dateString = date.toISOString()
  console.log(dateString)
  return dateString.slice(0, 10)
}

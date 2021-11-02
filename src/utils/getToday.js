export default function getToday() {
  const date = new Date()
  const dateString = date.toISOString()
  return dateString.slice(0, 10)
}

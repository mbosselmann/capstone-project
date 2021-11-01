export default function getToday() {
  const date = new Date()
  function day() {
    const day = date.getDate().toString()
    if (day.length === 1) {
      const newDay = '0' + day
      return newDay
    } else {
      return day
    }
  }
  const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + day()
  return today
}

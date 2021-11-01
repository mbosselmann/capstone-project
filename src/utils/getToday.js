export default function getToday() {
  const date = new Date()
  function formatDay() {
    const day = date.getDate().toString()
    if (day < 10) {
      const newDay = '0' + day
      return newDay
    } else {
      return day
    }
  }
  function formatMonth() {
    const month = date.getMonth() + 1
    if (month < 10) {
      const newMonth = '0' + month
      return newMonth
    } else {
      return month
    }
  }
  const today = date.getFullYear() + '-' + formatMonth() + '-' + formatDay()
  return today
}

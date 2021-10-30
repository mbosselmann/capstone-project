import formatData from '../utils/formatData'

export default async function getBook(isbn) {
  const res = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  )
  const data = await res.json()
  return formatData(data)
}

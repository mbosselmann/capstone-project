import formatData from '../utils/formatData'

export default async function getBook(isbn) {
  return await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`
  )
    .then(res => res.json())
    .then(data => formatData(data))
    .catch(error => {
      console.error(error)
    })
}

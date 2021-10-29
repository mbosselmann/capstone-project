import placeholder from '../images/placeholder.png'

export default function formatData(book) {
  const searchResult = {
    title: book.items[0].volumeInfo.title,
    subtitle: book.items[0].volumeInfo.subtitle,
    authors: book.items[0].volumeInfo.authors,
    thumbnail: !book.items[0].volumeInfo.imageLinks
      ? placeholder
      : book.items[0].volumeInfo.imageLinks.thumbnail.replace('http', 'https'),
    year: book.items[0].volumeInfo.publishedDate.slice(0, 4),
    publisher: book.items[0].volumeInfo.publisher,
    pages: book.items[0].volumeInfo.pageCount,
    description: book.items[0].volumeInfo.description,
    isbn10:
      book.items[0].volumeInfo.industryIdentifiers[0].type === 'ISBN_10'
        ? book.items[0].volumeInfo.industryIdentifiers[0].identifier
        : book.items[0].volumeInfo.industryIdentifiers[1].identifier,
    isbn13:
      book.items[0].volumeInfo.industryIdentifiers[1].type === 'ISBN_13'
        ? book.items[0].volumeInfo.industryIdentifiers[1].identifier
        : book.items[0].volumeInfo.industryIdentifiers[0].identifier,
  }
  return searchResult
}

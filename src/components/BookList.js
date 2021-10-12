import Book from './Book'

function BookList({ books }) {
  return (
    <ul>
      {books.map(book => (
        <Book
          key={book.id}
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors}
          readingStatus={book.finished}
          readingStatusDate={book.readingSince}
          finishedSince={book.finishedSince}
          bookCover={book.volumeInfo.imageLinks.thumbnail}
        />
      ))}
    </ul>
  )
}

export default BookList

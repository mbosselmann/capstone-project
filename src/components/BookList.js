import Book from './Book'
import styled from 'styled-components/macro'

function BookList({ books, readingStatus }) {
  function filterTitle(status) {
    if (status === 'finishedBooks') {
      return 'Your library of finished books:'
    } else if (status === 'currentlyReading') {
      return 'Your library of books currently read:'
    } else {
      return ''
    }
  }

  return (
    <>
      <FilterContainer>
        {readingStatus && <h2>{filterTitle(readingStatus)}</h2>}
      </FilterContainer>
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
    </>
  )
}

export default BookList

const FilterContainer = styled.section`
  display: flex;
  gap: 20px;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;

  div {
    display: flex;
    gap: 20px;
  }
`

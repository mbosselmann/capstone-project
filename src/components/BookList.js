import Book from './Book'
import styled from 'styled-components/macro'
import { useState } from 'react'

function BookList({ books }) {
  const [filteredBooks, setFilteredBooks] = useState(books)
  const [readingStatus, setReadingStatus] = useState('')

  // for filtering and displaying book data (currently read & finished)
  function handleActiveReadingStatus(status, books) {
    setReadingStatus(status)
    if (status === 'true') {
      const readBooks = books.filter(book => book.finished === true)
      setFilteredBooks(readBooks)
    } else if (status === 'false') {
      const currentlyReadBooks = books.filter(book => book.finished === false)
      setFilteredBooks(currentlyReadBooks)
    } else if (status === '') {
      setFilteredBooks(books)
    }
  }

  // changes title above displayed books according to selected books
  function filterTitle(status) {
    if (status === 'true') {
      return 'Your library of finished books:'
    } else if (status === 'false') {
      return 'Your library of books currently read:'
    } else {
      return ''
    }
  }

  return (
    <>
      <FilterContainer>
        <div>
          <Button
            onClick={() => {
              handleActiveReadingStatus('false', books)
            }}
          >
            Currently reading
          </Button>
          <Button
            onClick={() => {
              handleActiveReadingStatus('true', books)
            }}
          >
            Finished reading
          </Button>
        </div>
        <h3>{filterTitle(readingStatus)}</h3>
      </FilterContainer>
      <ul>
        {filteredBooks.map(book => (
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

  div {
    display: flex;
    gap: 20px;
  }
`

const Button = styled.button`
  border: none;
  border-radius: 5px;
  background-color: #afa8ba;
  color: #fff;
  padding: 0.5rem 1rem;
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);

  &:active {
    background-color: #4a4453;
  }
`

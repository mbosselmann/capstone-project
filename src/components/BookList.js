import Book from './Book'
import styled from 'styled-components/macro'
import TitleBookList from './TitleBookList'

function BookList({ books, username, status }) {
  const filteredBooks =
    status === '/library'
      ? books.filter(book => book.finished === true)
      : books.filter(book => book.finished === false)

  return (
    <Wrapper>
      <TitleContainer data-testid="booklist-title">
        {status && <TitleBookList status={status} username={username} />}
      </TitleContainer>
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
    </Wrapper>
  )
}

export default BookList

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 1fr 1fr 1fr 1fr;

  ul {
    grid-row: 2 / 6;
    grid-column: 1;
    z-index: 10;
  }
`

const TitleContainer = styled.section`
  grid-row: 1 / 3;
  grid-column: 1;
  height: 225px;
  display: flex;
  flex-direction: column;
  align-items: left;
  background-color: #4a4453;
  color: #fff;
  padding: 1.5rem 1rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 70px;
  }

  h2 {
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Libre Baskerville', serif;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.1rem;
  }
`

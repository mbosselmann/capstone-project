import Book from './Book'
import Message from './Message'
import styled from 'styled-components/macro'
import TitleBookList from './TitleBookList'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import klammerfischImage from '../images/klammer-message.jpg'

function BookList({ books, username }) {
  const [fishMessage, setFishMessage] = useState('')
  const { pathname: status } = useLocation()
  const message = 'Gotcha! Add your own Klammerfisch book! :)'

  useEffect(() => {
    if (fishMessage === 'Gotcha!') {
      const timer = setTimeout(() => {
        setFishMessage('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [fishMessage])

  const filteredBooks =
    status === '/library'
      ? books.filter(book => book.finished === true)
      : books.filter(book => book.finished === false)

  function handleSetFishMessage(message) {
    setFishMessage(message)
  }

  return (
    <Wrapper>
      {fishMessage === 'Gotcha!' && (
        <Message
          image={klammerfischImage}
          message={message}
          alt-text="neue fische"
        />
      )}
      <TitleContainer data-testid="booklist-title">
        {status && (
          <TitleBookList
            username={username}
            onHandleSetFishMessage={handleSetFishMessage}
          />
        )}
      </TitleContainer>
      <ul>
        {filteredBooks.map(book => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            authors={book.authors}
            readingStatus={book.finished}
            readingStatusDate={book.readingSince}
            finishedOn={book.finishedOn}
            bookCover={book.thumbnail}
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
  }

  p {
    font-size: 1.1rem;
  }
`

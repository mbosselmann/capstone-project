import DropDownMenu from './DropDownMenu'
import Message from './Message'
import UpdatePage from './UpdatePage'
import styled from 'styled-components/macro'
import { Link, useParams, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import back from '../images/back-to.svg'
import success from '../images/success.svg'
import setLocalStorage from '../lib/saveToLocal'
import getToday from '../utils/getToday'
import formatDate from '../utils/formatDate'

function BookDetails({ books, onHandleSetBooks }) {
  const [updatePage, setUpdatePage] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('')
  const { id } = useParams()
  const history = useHistory()
  const book = books.find(book => book.id === id)
  const message = 'Update was successful!'

  useEffect(() => {
    if (updateMessage === 'Updated!') {
      const timer = setTimeout(() => {
        setUpdateMessage('')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [updateMessage])

  function handleSetUpdateMessage(update) {
    setUpdateMessage(update)
  }

  function handleSetUpdatePage() {
    setUpdatePage(!updatePage)
  }

  function handleUpdateBookList(updatedBook) {
    const updatedBookList = books.filter(b => b.id !== book.id)
    const newBooklist = [updatedBook, ...updatedBookList]
    onHandleSetBooks(newBooklist)
    setLocalStorage('books', newBooklist)
  }

  function handleBookStatusUpdate(book) {
    const updatedBook = {
      ...book,
      finished: !book.finished,
      readingSince: book.readingSince
        ? book.readingSince
        : formatDate(getToday()),
      finishedOn: book.finished ? '' : formatDate(getToday()),
    }
    handleUpdateBookList(updatedBook)
  }

  function handleDeleteBook(book) {
    const filteredBooks = books.filter(b => b.id !== book.id)
    onHandleSetBooks(filteredBooks)
    setLocalStorage('books', filteredBooks)
    if (book.finished) {
      history.push('/library')
    } else {
      history.push('/currently-reading')
    }
  }

  return (
    <Article>
      {updateMessage === 'Updated!' && (
        <Message image={success} message={message} altText="success" />
      )}
      {updatePage && (
        <UpdatePage
          book={book}
          onHandleSetBooks={onHandleSetBooks}
          onHandleSetUpdatePage={handleSetUpdatePage}
          onHandleUpdateBookList={handleUpdateBookList}
          onHandleSetUpdateMessage={handleSetUpdateMessage}
        />
      )}
      <ActionContainer>
        {book.finished ? (
          <Link to="/library">
            <img src={back} alt="back to book list of finished books" />
          </Link>
        ) : (
          <Link to="/currently-reading">
            <img src={back} alt="back to book list of currently read books" />
          </Link>
        )}
        <DropDownMenu
          book={book}
          onHandleBookStatusUpdate={handleBookStatusUpdate}
          onHandleDeleteBook={handleDeleteBook}
          onHandleSetUpdatePage={handleSetUpdatePage}
        />
      </ActionContainer>
      <TitleSection>
        <img src={book.thumbnail} alt="bookcover" />
        <h3>{book.title}</h3>
        <p>by {book.authors}</p>
      </TitleSection>
      <InfoSection>
        {book.subtitle && <h3>{book.subtitle}</h3>}
        <p>
          <span>Published:</span> {book.year}
        </p>
        <p>
          <span>Publisher:</span> {book.publisher}
        </p>
        <p>
          <span>Pages:</span> {book.pages ? book.pages : 'Unknown'}
        </p>
        {!book.finished && (
          <>
            <p>
              <span>Reading since:</span> {book.readingSince}
            </p>
            <p>
              <span>Currently on page:</span> {book.onPage ? book.onPage : '0'}/
              {book.pages ? book.pages : 'Unknown'}
            </p>
          </>
        )}
        {book.description && (
          <div>
            <p>
              <span>Description:</span>
            </p>
            <p>{book.description}</p>
          </div>
        )}
      </InfoSection>
    </Article>
  )
}

const Article = styled.article`
  background-color: var(--bg-color-light);
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
`

const InfoSection = styled.div`
  background-color: var(--bg-color-main);
  padding: 1.5rem;
  border-radius: var(--border-radius-normal-top);
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0 2rem;

  p {
    margin: 0.5rem 0;
  }

  span {
    font-weight: var(--font-weight-bold);
  }
`

const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;

  img {
    max-height: 130px;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
    margin: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`

export default BookDetails

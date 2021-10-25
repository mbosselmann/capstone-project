import BookList from './components/BookList'
import Navigation from './components/Navigation'
import AddBook from './components/AddBook'
import StartAddBook from './components/AddBookStart'
import Start from './components/Start'
import styled from 'styled-components/macro'
import {
  Route,
  Switch,
  useLocation,
  Redirect,
  useHistory,
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import getLocalStorage from './lib/loadFromLocal'
import setLocalStorage from './lib/saveToLocal'
import getToday from './utils/getToday'
import { nanoid } from 'nanoid'
import placeholder from './images/placeholder.png'

function App({ data }) {
  const [username, setUsername] = useState(getLocalStorage('user') ?? '')
  const [books, setBooks] = useState(
    getLocalStorage(`books${username}`) ?? data
  )
  const [bookcover, setBookcover] = useState(placeholder)
  const [message, setMessage] = useState('')
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    setLocalStorage('user', username)
    setLocalStorage(`books${username}`, books)
  }, [username, books])

  useEffect(() => {
    if (message === 'ISBN error') {
      const timer = setTimeout(() => {
        setMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
    if (message === 'Success!') {
      const timer = setTimeout(() => {
        history.push('/currently-reading')
        setMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [message, history])

  function getBookcoverPreview(previewEvent) {
    const preview = previewEvent.target.files[0]
    const reader = new FileReader()
    reader.onload = event => {
      setBookcover(event.target.result)
    }
    reader.readAsDataURL(preview)
  }

  function handleCreateNewBook(newBookData) {
    const { title, authors, readingSince, onPage, thumbnail } = newBookData
    const newBook = {
      id: nanoid(),
      finished: false,
      readingSince: readingSince,
      finishedSince: '',
      onPage: onPage,
      volumeInfo: {
        title: title,
        authors: authors,
        imageLinks: {
          thumbnail: !thumbnail ? bookcover : thumbnail,
        },
      },
    }
    const newBooks = [newBook, ...books]
    setBooks(newBooks)
    setLocalStorage(`books${username}`, newBooks)
  }

  function handleISBNSearch(isbn) {
    const searchedBook = data.find(
      book =>
        book.volumeInfo.industryIdentifiers[0].identifier === isbn ||
        book.volumeInfo.industryIdentifiers[1].identifier === isbn
    )
    if (!searchedBook) {
      setMessage('ISBN error')
    } else {
      setMessage('Success!')
      handleCreateNewBook({
        title: searchedBook.volumeInfo.title,
        authors: searchedBook.volumeInfo.authors,
        readingSince: getToday(),
        onPage: '',
        thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
      })
    }
  }

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/">
          {username ? (
            <Redirect to="/currently-reading" />
          ) : (
            <Start setUsername={setUsername} />
          )}
        </Route>
        <Main>
          <Route exact path={['/currently-reading', '/library']}>
            {!username ? (
              <Redirect to="/" />
            ) : (
              <BookList books={books} username={username} status={pathname} />
            )}
          </Route>
          <Route exact path="/add-book">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <StartAddBook
                onHandleISBNSearch={handleISBNSearch}
                message={message}
              />
            )}
          </Route>
          <Route exact path="/add-book-form">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <AddBook
                onCreateNewBook={handleCreateNewBook}
                onGetBookCoverPreview={getBookcoverPreview}
              />
            )}
          </Route>
        </Main>
      </Switch>
      <Route
        exact
        path={['/currently-reading', '/library', '/add-book', '/add-book-form']}
      >
        <Footer>
          <Navigation />
        </Footer>
      </Route>
    </AppContainer>
  )
}

const Main = styled.main`
  grid-area: main;
  overflow-y: scroll;
`

const Footer = styled.footer`
  grid-area: footer;
  z-index: 10;
`

const AppContainer = styled.div`
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: auto 4rem;
  grid-template-areas: 'main' 'footer';
`

export default App

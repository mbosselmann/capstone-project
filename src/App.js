import BookList from './components/BookList'
import Navigation from './components/Navigation'
import AddBook from './components/AddBook'
import StartAddBook from './components/AddBookStart'
import HomeScreen from './components/HomeScreen'
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
import { nanoid } from 'nanoid'
import placeholder from './images/placeholder.png'

function App() {
  const username = getLocalStorage('user') ?? ''
  const [books, setBooks] = useState(getLocalStorage(`books${username}`) ?? [])
  const [bookcover, setBookcover] = useState(placeholder)
  const [successMessage, setSuccessMessage] = useState('')
  const { pathname } = useLocation()
  const history = useHistory()

  useEffect(() => {
    if (successMessage === 'Success!') {
      const timer = setTimeout(() => {
        history.push('/currently-reading')
        setSuccessMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, history])

  function getBookcoverPreview(previewEvent) {
    const preview = previewEvent.target.files[0]
    const reader = new FileReader()
    reader.onload = event => {
      setBookcover(event.target.result)
    }
    reader.readAsDataURL(preview)
  }

  function handleCreateNewBook(newBookData) {
    const {
      title,
      authors,
      readingSince,
      onPage,
      thumbnail,
      identifier,
    } = newBookData
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
        industryIdentifiers: [
          { type: 'ISBN01', identifier: identifier },
          { type: 'ISBN02', identifier: identifier },
        ],
      },
    }
    const newBooks = [newBook, ...books]
    setBooks(newBooks)
    setLocalStorage(`books${username}`, newBooks)
    setSuccessMessage('Success!')
  }

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/">
          {username ? (
            <Redirect to="/currently-reading" />
          ) : (
            <HomeScreen history={history} />
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
                books={books}
                onHandleCreateNewBook={handleCreateNewBook}
                history={history}
              />
            )}
          </Route>
          <Route exact path="/add-book-form">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <AddBook
                successMessage={successMessage}
                onHandleCreateNewBook={handleCreateNewBook}
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

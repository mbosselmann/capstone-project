import AddBook from './components/AddBook'
import BookDetails from './components/BookDetails'
import BookList from './components/BookList'
import HomeScreen from './components/HomeScreen'
import Navigation from './components/Navigation'
import SearchViaISBN from './components/SearchViaISBN'
import styled from 'styled-components/macro'
import getLocalStorage from './lib/loadFromLocal'
import setLocalStorage from './lib/saveToLocal'
import { nanoid } from 'nanoid'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import placeholder from './images/placeholder.png'

function App() {
  const username = getLocalStorage('user') ?? ''
  const [books, setBooks] = useState(getLocalStorage(`books${username}`) ?? [])
  const [searchedBook, setSearchedBook] = useState('')
  const [bookcover, setBookcover] = useState(placeholder)
  const [successMessage, setSuccessMessage] = useState('')

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

  function handleSetSearchedBook(searchedBook) {
    setSearchedBook(searchedBook)
  }

  function handleCreateNewBook(newBookData) {
    const {
      title,
      authors,
      readingSince,
      onPage,
      thumbnail,
      isbn10,
      isbn13,
      year,
      publisher,
      description,
      subtitle,
      pages,
    } = newBookData
    const newBook = {
      id: nanoid(),
      finished: false,
      readingSince: readingSince,
      finishedSince: '',
      onPage: onPage,
      title: title,
      authors: authors,
      thumbnail: !thumbnail ? bookcover : thumbnail,
      isbn10: isbn10,
      isbn13: isbn13,
      year: year,
      publisher: publisher,
      description: description,
      subtitle: subtitle,
      pages: pages,
    }
    const newBooks = [newBook, ...books]
    setBooks(newBooks)
    setLocalStorage(`books${username}`, newBooks)
    setSuccessMessage('Success!')
    setSearchedBook('')
  }

  return (
    <AppContainer>
      <Switch>
        <Route exact path="/">
          {username ? <Redirect to="/currently-reading" /> : <HomeScreen />}
        </Route>
        <Main>
          <Route exact path={['/currently-reading', '/library']}>
            {!username ? (
              <Redirect to="/" />
            ) : (
              <BookList books={books} username={username} />
            )}
          </Route>
          <Route exact path="/add-book">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <SearchViaISBN onHandleSetSearchedBook={handleSetSearchedBook} />
            )}
          </Route>
          <Route exact path="/add-book-form">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <AddBook
                searchedBook={searchedBook}
                successMessage={successMessage}
                onHandleCreateNewBook={handleCreateNewBook}
                onGetBookCoverPreview={getBookcoverPreview}
              />
            )}
          </Route>
          <Route exact path="/book/:id">
            <BookDetails books={books} />
          </Route>
        </Main>
      </Switch>
      <Route
        exact
        path={[
          '/currently-reading',
          '/library',
          '/add-book',
          '/add-book-form',
          '/book/:id',
        ]}
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

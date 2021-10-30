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
import { Route, Switch, Redirect, useLocation } from 'react-router-dom'
import { useState } from 'react'

function App() {
  const [username, setUsername] = useState(getLocalStorage('user') ?? '')
  const [books, setBooks] = useState(getLocalStorage('books') ?? [])
  const [searchedBook, setSearchedBook] = useState('')
  const { pathname } = useLocation()

  function handleSetUsername(name) {
    setUsername(name)
  }

  function handleSetBooks(books) {
    setBooks(books)
  }
  function handleSetSearchedBook(searchedBook) {
    setSearchedBook(searchedBook)
  }

  function handleCreateNewBook(newBookData) {
    const newBook = {
      ...newBookData,
      id: nanoid(),
    }
    const newBooks = [newBook, ...books]
    setBooks(newBooks)
    setLocalStorage('books', newBooks)
    setSearchedBook('')
  }

  if (!username) {
    if (pathname === '/') {
      return (
        <AppContainer>
          <HomeScreen onHandleSetUsername={handleSetUsername} />
        </AppContainer>
      )
    } else {
      return <Redirect to="/" />
    }
  } else {
    return (
      <AppContainer>
        <Switch>
          <Route exact path="/">
            <HomeScreen onHandleSetUsername={handleSetUsername} />
          </Route>
          <Main>
            <Route exact path={['/currently-reading', '/library']}>
              <BookList books={books} username={username} />
            </Route>
            <Route exact path="/add-book">
              <SearchViaISBN onHandleSetSearchedBook={handleSetSearchedBook} />
            </Route>
            <Route exact path="/add-book-form">
              <AddBook
                searchedBook={searchedBook}
                onHandleCreateNewBook={handleCreateNewBook}
                onHandleSetSearchedBook={handleSetSearchedBook}
              />
            </Route>
            <Route exact path="/book/:id">
              <BookDetails books={books} onHandleSetBooks={handleSetBooks} />
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

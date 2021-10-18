import BookList from './components/BookList'
import Navigation from './components/Navigation'
import AddBook from './components/AddBook'
import Start from './components/Start'
import styled from 'styled-components/macro'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App({ data }) {
  const [filteredBooks, setFilteredBooks] = useState(data)
  const [readingStatus, setReadingStatus] = useState('')
  const { pathname } = useLocation()
  const [username, setUsername] = useState('')

  function handleBookList(status, books) {
    setReadingStatus(status)
    if (status === 'finishedBooks') {
      const readBooks = books.filter(book => book.finished === true)
      setFilteredBooks(readBooks)
    }
    if (status === 'currentlyReading') {
      const currentlyReadBooks = books.filter(book => book.finished === false)
      setFilteredBooks(currentlyReadBooks)
    }
    if (status === '') {
      setFilteredBooks(books)
    }
  }

  useEffect(() => {
    setReadingStatus(pathname)
    if (pathname === '/currently-reading') {
      handleBookList('currentlyReading', data)
    }
    if (pathname === '/library') {
      handleBookList('finishedBooks', data)
    }
  }, [pathname, data])

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
              <BookList
                books={filteredBooks}
                readingStatus={readingStatus}
                username={username}
              />
            )}
          </Route>
          <Route exact path="/add-book">
            <AddBook />
          </Route>
        </Main>
      </Switch>
      <Route exact path={['/currently-reading', '/library', '/add-book']}>
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

import BookList from './components/BookList'
import Navigation from './components/Navigation'
import AddBook from './components/AddBook'
import Start from './components/Start'
import usePathname from './hooks/usePathname'
import styled from 'styled-components/macro'
import { Route, Switch, useLocation, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import getLocalStorage from './lib/loadFromLocal'
import setLocalStorage from './lib/saveToLocal'

function App({ data }) {
  const [username, setUsername] = useState(getLocalStorage('user') || '')
  const [books, setBooks] = useState(
    getLocalStorage(`books${username}`) || data
  )
  const [filteredBooks, setFilteredBooks] = useState(books)
  const { pathname } = useLocation()

  useEffect(() => {
    setLocalStorage('user', username)
  }, [username])

  usePathname(pathname, books, setFilteredBooks)

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
                filteredBooks={filteredBooks}
                username={username}
                status={pathname}
              />
            )}
          </Route>
          <Route exact path="/add-book">
            {!username ? (
              <Redirect to="/" />
            ) : (
              <AddBook books={books} setBooks={setBooks} username={username} />
            )}
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

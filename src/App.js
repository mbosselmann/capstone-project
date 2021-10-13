import BookList from './components/BookList'
import Navigation from './components/Navigation'
import styled from 'styled-components/macro'
import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'

function App({ data }) {
  const [filteredBooks, setFilteredBooks] = useState(data)
  const [readingStatus, setReadingStatus] = useState('')

  function handleActiveReadingStatus(status, books) {
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

  return (
    <AppContainer>
      <Route exact path={['/', '/currently-reading', '/library']}>
        <Header>
          <h1>List of Books</h1>
          <h2>Hi user!</h2>
          <p>Welcome back! Here is your booklist:</p>
        </Header>
      </Route>
      <Main>
        <Switch>
          <Route exact path={['/', '/currently-reading', '/library']}>
            <BookList
              books={filteredBooks}
              readingStatus={readingStatus}
              setReadingStatus={setReadingStatus}
            />
          </Route>
        </Switch>
      </Main>
      <Footer>
        <Navigation
          books={data}
          onHandleActiveReadingStatus={handleActiveReadingStatus}
        />
      </Footer>
    </AppContainer>
  )
}

const Header = styled.header`
  margin: 20px;
  grid-area: header;
`

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
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: 120px auto 80px;
`

export default App

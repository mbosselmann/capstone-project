import BookList from './components/BookList'
import Navigation from './components/Navigation'
import Start from './components/Start'
import styled from 'styled-components/macro'
import { Route, Switch } from 'react-router-dom'
import { useState } from 'react'

function App({ data }) {
  const [filteredBooks, setFilteredBooks] = useState(data)
  const [readingStatus, setReadingStatus] = useState('')

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

  return (
    <AppContainer>
      <Route exact path={['/currently-reading', '/library']}>
        <Header>
          <h1>List of Books</h1>
          <h2>Hi user!</h2>
          <p>Welcome back! Here is your booklist:</p>
        </Header>
      </Route>
      <Switch>
        <Route exact path="/">
          <Start />
        </Route>
        <Route exact path={['/currently-reading', '/library']}>
          <Main>
            <BookList books={filteredBooks} readingStatus={readingStatus} />
          </Main>
        </Route>
      </Switch>
      <Route exact path={['/currently-reading', '/library']}>
        <Footer>
          <Navigation books={data} onHandleBookList={handleBookList} />
        </Footer>
      </Route>
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
`

const AppContainer = styled.div`
  height: 100vh;
  max-width: 600px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'header' 'main' 'footer';
  grid-template-rows: 120px auto 4rem;
`

export default App

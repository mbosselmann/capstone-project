import BookList from './components/BookList'
import styled from 'styled-components/macro'

function App({ data }) {
  return (
    <main>
      <Header>
        <h1>List of Books</h1>
        <h2>Hi user!</h2>
        <p>Welcome back! Here is your booklist:</p>
      </Header>
      <BookList books={data} />
    </main>
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

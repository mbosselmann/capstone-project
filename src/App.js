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
`

export default App

import BookList from './components/BookList'
import styled from 'styled-components'

function App({ data }) {
  return (
    <main>
      <Header>
        <h2>List of Books</h2>
        <h3>Hi user!</h3>
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

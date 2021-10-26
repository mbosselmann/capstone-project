import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Message from './Message'
import AddBookForm from './AddBookForm'
import back from '../images/back-to.svg'
import success from '../images/success.svg'
import setLocalStorage from '../lib/saveToLocal'
import getLocalStorage from '../lib/loadFromLocal'

function AddBook({
  onHandleCreateNewBook,
  onGetBookCoverPreview,
  successMessage,
}) {
  const bookPreview = getLocalStorage('searchedBook') ?? ''
  const message = 'Yay! The book was successfully added to your book list. :-)'
  const text = 'You will shortly be redirected to your currently reading page.'

  return (
    <Wrapper>
      {successMessage === 'Success!' && (
        <Message
          image={success}
          message={message}
          text={text}
          altText="success"
        />
      )}
      <LinkBack
        to="/add-book"
        onClick={() => setLocalStorage('searchedBook', '')}
      >
        <img src={back} alt="back to start adding a new book" />
      </LinkBack>
      <AddBookForm
        onHandleCreateNewBook={onHandleCreateNewBook}
        bookPreview={bookPreview}
        onGetBookCoverPreview={onGetBookCoverPreview}
      />
    </Wrapper>
  )
}

export default AddBook

const Wrapper = styled.div`
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const LinkBack = styled(Link)`
  flex: 1;
  img {
    width: 60px;
    margin: 0.5rem 0.5rem 0.2rem 0.5rem;
  }
`

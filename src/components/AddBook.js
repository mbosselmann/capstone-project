import AddBookForm from './AddBookForm'
import Message from './Message'
import styled from 'styled-components/macro'
import { Link, useHistory } from 'react-router-dom'
import { useState, useEffect } from 'react'
import back from '../images/back-to.svg'
import success from '../images/success.svg'

function AddBook({
  onHandleCreateNewBook,
  onGetBookCoverPreview,
  searchedBook,
}) {
  const [successMessage, setSuccessMessage] = useState('')
  const history = useHistory()
  const message = 'Yay! The book was successfully added to your book list. :)'
  const text = 'You will shortly be redirected to your currently reading page.'

  useEffect(() => {
    if (successMessage === 'Success!') {
      const timer = setTimeout(() => {
        history.push('/currently-reading')
        setSuccessMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, history])

  function handleSetSuccessMessage(success) {
    setSuccessMessage(success)
  }

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
      <LinkBack to="/add-book">
        <img src={back} alt="back to start adding a new book" />
      </LinkBack>
      <AddBookForm
        onHandleSetSuccessMessage={handleSetSuccessMessage}
        onHandleCreateNewBook={onHandleCreateNewBook}
        searchedBook={searchedBook}
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

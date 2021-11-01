import AddBookForm from './AddBookForm'
import Message from './Message'
import styled from 'styled-components/macro'
import { useState } from 'react'
import success from '../images/success.svg'

function AddBook({
  onHandleCreateNewBook,
  onHandleSetSearchedBook,
  searchedBook,
}) {
  const [successMessage, setSuccessMessage] = useState('')
  const message = 'Yay! The book was successfully added to your book list. :)'

  function handleSetSuccessMessage(success) {
    setSuccessMessage(success)
  }

  return (
    <Wrapper>
      {successMessage === 'Success!' && (
        <Message image={success} message={message} altText="success" />
      )}
      <AddBookForm
        successMessage={successMessage}
        onHandleSetSuccessMessage={handleSetSuccessMessage}
        onHandleSetSearchedBook={onHandleSetSearchedBook}
        onHandleCreateNewBook={onHandleCreateNewBook}
        searchedBook={searchedBook}
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

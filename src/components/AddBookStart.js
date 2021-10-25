import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Message from './Message'
import error from '../images/error.svg'
import success from '../images/success.svg'
import getToday from '../utils/getToday'

function StartAddBook({ books, message, onHandleCreateNewBook, setMessage }) {
  const errorMessage = `Oh no! The ISBN doesn't seem to exist. :-(`
  const errorText =
    'Please try again or use the possibility to add your book manually below.'
  const successMessage =
    'Yay! The book was successfully added to your book list. :-)'
  const successText =
    'You will shortly be redirected to your currently reading page.'

  function handleISBNSearch(isbn) {
    const searchedBook = books.find(
      book =>
        book.volumeInfo.industryIdentifiers[0].identifier === isbn ||
        book.volumeInfo.industryIdentifiers[1].identifier === isbn
    )
    if (!searchedBook) {
      setMessage('ISBN error')
    } else {
      setMessage('Success!')
      onHandleCreateNewBook({
        title: searchedBook.volumeInfo.title,
        authors: searchedBook.volumeInfo.authors,
        readingSince: getToday(),
        onPage: '',
        thumbnail: searchedBook.volumeInfo.imageLinks.thumbnail,
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { isbn } = form.elements
    handleISBNSearch(isbn.value)
    form.reset()
  }

  return (
    <Wrapper>
      {(message === 'ISBN error' && (
        <Message
          image={error}
          message={errorMessage}
          text={errorText}
          alt-text="error"
        />
      )) ||
        (message === 'Success!' && (
          <Message
            image={success}
            message={successMessage}
            text={successText}
            altText="success"
          />
        ))}
      <h2>Add a new book:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="isbn">
          Please insert the ISBN of the book you want to add to your book list:
        </label>
        <input
          name="isbn"
          id="isbn"
          type="text"
          placeholder="978123456789"
          required
          autoComplete="off"
        />
        <button>Search</button>
      </form>
      <Divider />
      <div>
        <p>
          You don't have the ISBN at hand or want to enter the book manually?
        </p>
        <LinkToForm to="/add-book-form">Click here</LinkToForm>
      </div>
    </Wrapper>
  )
}

export default StartAddBook

const Wrapper = styled.div`
  width: 100%;

  h2 {
    padding: 3rem 1rem 1.5rem 1.6rem;
    background-color: #504465;
    color: #fff;
  }

  form {
    padding: 0 1rem;
  }

  label {
    margin: 0 0 0.5rem 0.6rem;
  }

  p {
    padding: 0 1rem;
    font-size: 0.9rem;
    margin: 0 0 0.5rem 0.6rem;
  }
`

const Divider = styled.hr`
  margin: 2rem;
  border-radius: 5px;
  background-color: #504465;
  border: 0.1rem solid #504465;
`

const LinkToForm = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.7rem 1.2rem 0 1.2rem;
  background-color: #504465;
  color: #fff;
  height: 2.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 5px;
  text-transform: uppercase;
  text-decoration: none;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
`

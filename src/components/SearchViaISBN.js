import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import Message from './Message'
import error from '../images/error.svg'
import { useState, useEffect } from 'react'
import setLocalStorage from '../lib/saveToLocal'
import placeholder from '../images/placeholder.png'

export default function SearchViaISBN({ history, onHandleSetSearchedBook }) {
  const [errorMessage, setErrorMessage] = useState('')
  const message = `Oh no! The ISBN doesn't seem to exist. :(`
  const text = 'Please try again or add your book manually below.'

  function getBook(isbn) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`)
      .then(res => res.json())
      .then(book => {
        const searchResult = {
          title: book.items[0].volumeInfo.title,
          subtitle: book.items[0].volumeInfo.subtitle,
          authors: book.items[0].volumeInfo.authors,
          thumbnail: !book.items[0].volumeInfo.imageLinks
            ? placeholder
            : book.items[0].volumeInfo.imageLinks.thumbnail.replace(
                'http',
                'https'
              ),
          year: book.items[0].volumeInfo.publishedDate.slice(0, 4),
          publisher: book.items[0].volumeInfo.publisher,
          pages: book.items[0].volumeInfo.pageCount,
          description: book.items[0].volumeInfo.description,
          isbn10:
            book.items[0].volumeInfo.industryIdentifiers[0].type === 'ISBN_10'
              ? book.items[0].volumeInfo.industryIdentifiers[0].identifier
              : book.items[0].volumeInfo.industryIdentifiers[1].identifier,
          isbn13:
            book.items[0].volumeInfo.industryIdentifiers[1].type === 'ISBN_13'
              ? book.items[0].volumeInfo.industryIdentifiers[1].identifier
              : book.items[0].volumeInfo.industryIdentifiers[0].identifier,
        }
        onHandleSetSearchedBook(searchResult)
        history.push('/add-book-form')
      })
      .catch(error => {
        console.error(error)
        setErrorMessage('ISBN error')
      })
  }

  useEffect(() => {
    if (errorMessage === 'ISBN error') {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errorMessage])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { isbn } = form.elements
    getBook(isbn.value.replace('-', ''))
    form.reset()
  }

  return (
    <Wrapper>
      {errorMessage === 'ISBN error' && (
        <Message image={error} message={message} text={text} alt-text="error" />
      )}
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
          maxLength="14"
          pattern="[A-Za-z0-9-]+"
        />
        <button>Search</button>
      </form>
      <Divider />
      <div>
        <p>
          You don't have the ISBN at hand or want to enter the book manually?
        </p>
        <LinkToForm
          to="/add-book-form"
          onClick={() => setLocalStorage('searchedBook', '')}
        >
          Click here
        </LinkToForm>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;

  h2 {
    padding: 3rem 1rem 1.5rem 1.6rem;
    background-color: #504465;
    color: #fff;
  }

  form {
    padding: 0 1rem;
    margin-top: 3rem;
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
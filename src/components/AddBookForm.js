import styled from 'styled-components/macro'
import { useState } from 'react'
import previewPlaceholder from '../images/preview-placeholder.png'
import getToday from '../utils/getToday'
import handleAuthorsLength from '../utils/handleAuthorsLength'
import placeholder from '../images/placeholder.png'
import setLocalStorage from '../lib/saveToLocal'

export default function AddBookForm({
  onHandleCreateNewBook,
  onGetBookCoverPreview,
  bookPreview,
}) {
  const [preview, setPreview] = useState(placeholder)

  function getPreview(previewEvent) {
    const preview = URL.createObjectURL(previewEvent.target.files[0])
    setPreview(preview)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { title, authors, readingSince, onPage } = form.elements
    onHandleCreateNewBook({
      title: title.value,
      authors: authors.value,
      readingSince: readingSince.value ? readingSince.value : getToday(),
      onPage: onPage.value,
      thumbnail: bookPreview
        ? bookPreview.volumeInfo.imageLinks.thumbnail
        : preview,
      identifier: bookPreview
        ? bookPreview.volumeInfo.industryIdentifiers[0].identifier
        : '',
    })
    form.reset()
    setLocalStorage('searchedBook', '')
  }

  return (
    <Form onSubmit={event => handleSubmit(event)}>
      <MainContentContainer>
        <h2>New book:</h2>
        {bookPreview && (
          <>
            <label htmlFor="isbn">ISBN:</label>
            <input
              name="isbn"
              type="text"
              id="isbn"
              placeholder="978123456789"
              defaultValue={
                bookPreview.volumeInfo.industryIdentifiers[0].identifier ||
                bookPreview.volumeInfo.industryIdentifiers[1].identifier
              }
              maxLength="13"
              pattern="[A-Za-z0-9]+"
              autoComplete="off"
              required
            />
          </>
        )}
        <label htmlFor="bookTitle">Book title:</label>
        <input
          name="title"
          type="text"
          id="bookTitle"
          placeholder="Title of the book you want to add"
          defaultValue={bookPreview ? bookPreview.volumeInfo.title : ''}
          autoComplete="off"
          required
        />
        <label htmlFor="bookAuthors">Author or Authors:</label>
        <input
          name="authors"
          type="text"
          id="bookAuthors"
          placeholder="Name or names of the author/authors"
          defaultValue={
            bookPreview
              ? handleAuthorsLength(bookPreview.volumeInfo.authors)
              : ''
          }
          autoComplete="off"
          required
        />
      </MainContentContainer>
      <OptionalContentContainer>
        <BookcoverContainer>
          {bookPreview ? (
            <div id="bookcover-preview">
              <img
                src={bookPreview.volumeInfo.imageLinks.thumbnail}
                alt="bookcover"
              />
            </div>
          ) : (
            <div id="bookcover-preview">
              {preview === placeholder ? (
                <img src={previewPlaceholder} alt="bookcover" />
              ) : (
                <img src={preview} alt="bookcover" />
              )}
            </div>
          )}
          <input
            type="file"
            name="bookcover"
            id="bookcover"
            accept=".png, .jpeg, .jpg"
            onChange={event => {
              onGetBookCoverPreview(event)
              getPreview(event)
            }}
          />
          <label aria-label="select bookcover" htmlFor="bookcover">
            Select
          </label>
        </BookcoverContainer>
        <div>
          <label htmlFor="reading-since">Reading since:</label>
          <input
            name="readingSince"
            type="date"
            id="reading-since"
            max={getToday()}
          />
          <label htmlFor="onPage">Currently on page:</label>
          <input
            name="onPage"
            type="number"
            id="onPage"
            placeholder="e. g. 72"
            autoComplete="off"
          />
        </div>
      </OptionalContentContainer>
      <button>Add book to list</button>
    </Form>
  )
}

const Form = styled.form`
  background-color: #fff;
  border-radius: 25px 25px 0 0;
  box-shadow: var(--box-shadow);
  padding: 1rem;
  flex: 10;

  h2 {
    font-family: 'Libre Baskerville', serif;
    padding-left: 0.5rem;
    margin-bottom: 1rem;
  }

  button {
    background-color: #504465;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.5rem;
  }
`

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const OptionalContentContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;

  div {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
`

const BookcoverContainer = styled.div`
  margin-top: 1.35rem;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    max-height: 120px;
    max-width: 100%;
    position: relative;
    margin: 0 auto;
    border-radius: 5px;
  }

  input {
    display: none;
  }

  label {
    background-color: #4a4453;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    margin-left: 0;
    border-radius: 5px;
    font-weight: 600;
    width: 80%;
    text-transform: uppercase;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }
`

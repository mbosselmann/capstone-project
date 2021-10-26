import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components/macro'
import placeholder from '../images/placeholder.png'
import previewPlaceholder from '../images/preview-placeholder.png'
import getToday from '../utils/getToday'

function AddBook({
  onHandleCreateNewBook,
  onGetBookCoverPreview,
  onHandleAuthorsLength,
}) {
  const history = useHistory()
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
      readingSince: readingSince.value,
      onPage: onPage.value,
      identifier: '',
    })
    form.reset()
    history.push('/currently-reading')
  }

  return (
    <Wrapper>
      <LinkBack
        to="/add-book"
        onClick={() => setLocalStorage('searchedBook', '')}
      >
        <img src={back} alt="back to start adding a new book" />
      </LinkBack>
      <Form onSubmit={handleSubmit}>
        <RequiredContainer>
          <h2>New book:</h2>
          <label htmlFor="bookTitle">Book title:</label>
          <input
            name="title"
            type="text"
            id="bookTitle"
            placeholder="Title of the book you want to add"
            required
          />
          <label htmlFor="bookAuthors">Author or Authors:</label>
          <input
            name="authors"
            type="text"
            id="bookAuthors"
            placeholder="Name or names of the author/authors"
            required
          />
        </RequiredContainer>
        <OptionalContainer>
          <BookcoverContainer>
            <div id="bookcover-preview">
              {preview === placeholder ? (
                <img src={previewPlaceholder} alt="bookcover"></img>
              ) : (
                <img src={preview} alt="bookcover"></img>
              )}
            </div>
            <input
              type="file"
              name="bookcover"
              id="chooseBookcover"
              accept=".png, .jpeg, .jpg"
              onChange={preview => {
                onGetBookCoverPreview(preview)
                getPreview(preview)
              }}
            />
            <label aria-label="select bookcover" htmlFor="chooseBookcover">
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
            />
          </div>
        </OptionalContainer>
        <button>Add book to list</button>
      </Form>
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

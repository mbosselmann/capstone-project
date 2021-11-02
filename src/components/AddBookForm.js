import styled from 'styled-components/macro'
import { useState } from 'react'
import previewPlaceholder from '../images/preview-placeholder.png'
import getToday from '../utils/getToday'
import formatDate from '../utils/formatDate'
import handleAuthorsLength from '../utils/handleAuthorsLength'
import placeholder from '../images/placeholder.png'
import back from '../images/arrow.svg'
import reset from '../images/reset.svg'
import { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'

export default function AddBookForm({
  onHandleSetSuccessMessage,
  onHandleCreateNewBook,
  onHandleSetSearchedBook,
  searchedBook,
  successMessage,
}) {
  const [bookcover, setBookcover] = useState(placeholder)
  const [isFinished, setIsFinished] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (successMessage === 'Success!') {
      const timer = setTimeout(() => {
        isFinished
          ? history.push('/library')
          : history.push('/currently-reading')
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [successMessage, history, isFinished])

  function getBookcoverPreview(event) {
    const image = event.target.files[0]
    const reader = new FileReader()
    reader.onload = event => {
      setBookcover(event.target.result)
      if (searchedBook) {
        onHandleSetSearchedBook({
          ...searchedBook,
          thumbnail: event.target.result,
        })
      }
    }
    reader.readAsDataURL(image)
  }

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { title, authors, readingSince, onPage, finishedOn } = form.elements
    onHandleCreateNewBook({
      title: title.value,
      authors: authors.value,
      finished: isFinished,
      readingSince: isFinished ? '' : formatDate(readingSince.value),
      finishedOn: isFinished ? formatDate(finishedOn.value) : '',
      onPage: isFinished ? '' : onPage.value,
      thumbnail: searchedBook ? searchedBook.thumbnail : bookcover,
      isbn10: searchedBook ? searchedBook.isbn10 : '',
      isbn13: searchedBook ? searchedBook.isbn13 : '',
      year: searchedBook ? searchedBook.year : 'Unknown',
      publisher: searchedBook ? searchedBook.publisher : 'Unknown',
      description: searchedBook ? searchedBook.description : '',
      subtitle: searchedBook ? searchedBook.subtitle : '',
      pages: searchedBook ? searchedBook.pages : '',
    })
    onHandleSetSuccessMessage('Success!')
    setBookcover(placeholder)
    form.reset()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ActionContainer>
        <BackLink to="/add-book">
          <img src={back} alt="back to start adding a new book" />
        </BackLink>
        <ResetButton
          type="reset"
          onClick={() => {
            onHandleSetSearchedBook('')
            setBookcover(placeholder)
          }}
        >
          <img src={reset} alt="reset" />
        </ResetButton>
      </ActionContainer>
      <Wrapper>
        <MainContentContainer>
          <h2>New book:</h2>
          {searchedBook && (
            <>
              <label htmlFor="isbn">ISBN:</label>
              <input
                name="isbn"
                type="text"
                id="isbn"
                placeholder="978123456789"
                defaultValue={searchedBook.isbn13 || searchedBook.isbn10}
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
            defaultValue={searchedBook ? searchedBook.title : ''}
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
              searchedBook ? handleAuthorsLength(searchedBook.authors) : ''
            }
            autoComplete="off"
            required
          />
        </MainContentContainer>
        <OptionalContentContainer>
          <BookcoverContainer>
            {searchedBook ? (
              <div id="bookcover-preview">
                <img src={searchedBook.thumbnail} alt="bookcover" />
              </div>
            ) : (
              <div id="bookcover-preview">
                {bookcover === placeholder ? (
                  <img src={previewPlaceholder} alt="bookcover" />
                ) : (
                  <img src={bookcover} alt="bookcover" />
                )}
              </div>
            )}
            <input
              type="file"
              name="bookcover"
              id="bookcover"
              accept=".png, .jpeg, .jpg"
              onChange={event => {
                getBookcoverPreview(event)
              }}
            />
            <label aria-label="select bookcover" htmlFor="bookcover">
              Select
            </label>
          </BookcoverContainer>
          <ReadingStatus>
            {isFinished ? (
              <div>
                <label htmlFor="finishedOn">Finished on:</label>
                <input
                  name="finishedOn"
                  type="date"
                  id="finishedOn"
                  max={getToday()}
                  defaultValue={getToday()}
                />
              </div>
            ) : (
              <>
                <label htmlFor="readingSince">Reading since:</label>
                <input
                  name="readingSince"
                  type="date"
                  id="readingSince"
                  max={getToday()}
                  defaultValue={getToday()}
                />
                <label htmlFor="onPage">Currently on page:</label>
                <input
                  name="onPage"
                  type="number"
                  id="onPage"
                  placeholder="e. g. 72"
                  autoComplete="off"
                  min="0"
                  max={searchedBook ? searchedBook.pages : ''}
                />
              </>
            )}
            <button type="button" onClick={() => setIsFinished(!isFinished)}>
              {isFinished ? 'Not finished?' : 'Or finished?'}
            </button>
          </ReadingStatus>
        </OptionalContentContainer>
        <SubmitButton>Add book to list</SubmitButton>
      </Wrapper>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-light);

  h2 {
    padding-left: 0.5rem;
    margin-bottom: 1rem;
  }
`

const Wrapper = styled.div`
  background-color: var(--bg-color-main);
  border-radius: var(--border-radius-normal);
  box-shadow: var(--box-shadow);
  padding: 1rem 1rem 1.5rem;
`

const BackLink = styled(Link)`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  margin: 0.5rem 0 1rem 0.5rem;

  img {
    width: 24px;
  }
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto 1rem;
`

const ResetButton = styled.button`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  margin: 0.5rem 0 1rem 0.5rem;

  img {
    margin-right: 0.2rem;
  }

  &:focus {
    height: 50px;
    width: 50px;
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
  height: 182px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  img {
    max-height: 120px;
    position: relative;
    margin: 0 auto;
    border-radius: 5px;
    box-shadow: var(--box-shadow);
  }

  input {
    display: none;
  }

  label {
    font-size: 1.2rem;
    background-color: #4a4453;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    margin-left: 0;
    border-radius: 5px;
    font-weight: 600;
    width: 100%;
    text-transform: uppercase;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }
`

const ReadingStatus = styled.div`
  display: flex;
  justify-content: space-between;
  height: 200px;

  button {
    background-color: #4a4453;
    height: 40px;
  }

  button:focus {
    height: 40px;
  }
`

const SubmitButton = styled.button`
  background-color: var(--button-bg-color-primary);
  width: 100%;
`

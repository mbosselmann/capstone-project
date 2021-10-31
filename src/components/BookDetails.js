import DropDownMenu from './DropDownMenu'
import styled from 'styled-components/macro'
import { Link, useParams, useHistory } from 'react-router-dom'
import back from '../images/back-to.svg'
import setLocalStorage from '../lib/saveToLocal'
import getToday from '../utils/getToday'

function BookDetails({ books, onHandleSetBooks }) {
  const { id } = useParams()
  const history = useHistory()
  const book = books.find(book => book.id === id)

  function handleUpdateBookList(updatedBook) {
    const updatedBookList = books.filter(b => b.id !== book.id)
    const newBooklist = [updatedBook, ...updatedBookList]
    onHandleSetBooks(newBooklist)
    setLocalStorage('books', newBooklist)
  }

  function handleBookStatusUpdate(book) {
    const updatedBook = {
      ...book,
      finished: !book.finished,
      readingSince: book.readingSince ? book.readingSince : getToday(),
      finishedOn: book.finished ? book.finished : getToday(),
    }
    handleUpdateBookList(updatedBook)
  }

  function handleDeleteBook(book) {
    const filteredBooks = books.filter(b => b.id !== book.id)
    onHandleSetBooks(filteredBooks)
    setLocalStorage('books', filteredBooks)
    if (book.finished) {
      history.push('/library')
    } else {
      history.push('/currently-reading')
    }
  }

  return (
    <Article>
      <ActionContainer>
        {book.finished ? (
          <Link to="/library">
            <img src={back} alt="back to book list of finished books" />
          </Link>
        ) : (
          <Link to="/currently-reading">
            <img src={back} alt="back to book list of currently read books" />
          </Link>
        )}
        <DropDownMenu
          book={book}
          onHandleBookStatusUpdate={handleBookStatusUpdate}
          onHandleDeleteBook={handleDeleteBook}
        />
      </ActionContainer>
      <TitleSection>
        <img src={book.thumbnail} alt="bookcover" />
        <h3>{book.title}</h3>
        <p>by {book.authors}</p>
      </TitleSection>
      <InfoSection>
        {book.subtitle && <h3>{book.subtitle}</h3>}
        <p>
          <span>Published:</span> {book.year}
        </p>
        <p>
          <span>Publisher:</span> {book.publisher}
        </p>
        <p>
          <span>Pages:</span> {book.pages ? book.pages : 'Unknown'}
        </p>
        {!book.finished && (
          <>
            <p>
              <span>Reading since:</span> {book.readingSince}
            </p>
            <p>
              <span>Currently on page:</span> {book.onPage ? book.onPage : '0'}/
              {book.pages ? book.pages : 'Unknown'}
            </p>
          </>
        )}
        {book.description && (
          <div>
            <p>
              <span>Description:</span>
            </p>
            <DescriptionText>{book.description}</DescriptionText>
          </div>
        )}
      </InfoSection>
    </Article>
  )
}

const Article = styled.article`
  background-color: #f6f6f6;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
`

const InfoSection = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 25px 25px 0 0;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  flex-grow: 1;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0 2rem;

  p {
    margin: 0.5rem 0;
  }

  span {
    font-weight: 600;
  }
`

const TitleSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;

  img {
    max-height: 130px;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
    margin: 1rem;
  }

  p {
    margin-bottom: 1rem;
  }
`

const DescriptionText = styled.p`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 10;
  -webkit-box-orient: vertical;
`

export default BookDetails

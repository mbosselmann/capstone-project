import back from '../images/back-to.svg'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

function BookDetails({ books, pathname }) {
  const bookId = pathname.slice(7)
  const book = books.find(book => book.id === bookId)
  console.log(pathname)
  console.log(book)

  return (
    <Article>
      <Link to="/currently-reading">
        <img src={back} alt="back to book list" />
      </Link>
      <TitleSection>
        <img src={book.thumbnail} alt="bookcover" />
        <h3>{book.title}</h3>
        <p>by {book.authors}</p>
      </TitleSection>
      <InfoSection>
        <div>
          {book.subtitle && <h3>{book.subtitle}</h3>}
          <p>
            <strong>Published:</strong> {book.year}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
        </div>
        <div>
          <p>
            <strong>Pages:</strong> {book.pages ? book.pages : 'Unknown'}
          </p>
          <p>
            <strong>Reading since:</strong> {book.readingSince}
          </p>
          <p>
            <strong>Currently on page:</strong>{' '}
            {book.onPage ? book.onPage : '0'}/
            {book.pages ? book.pages : 'Unknown'}
          </p>
        </div>
        {book.description ? (
          <div>
            <p>
              <strong>Description:</strong>
            </p>
            <p>{book.description}</p>
          </div>
        ) : (
          ''
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

const InfoSection = styled.div`
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 25px 25px 0 0;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
  flex-grow: 1;

  div {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 0 1rem;
  }

  p {
    margin: 0.5rem 0;
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

export default BookDetails

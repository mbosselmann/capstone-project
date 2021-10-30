import back from '../images/back-to.svg'
import styled from 'styled-components/macro'
import { Link, useParams } from 'react-router-dom'

function BookDetails({ books }) {
  const { id } = useParams()
  const book = books.find(book => book.id === id)

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
            <p>{book.description}</p>
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

export default BookDetails

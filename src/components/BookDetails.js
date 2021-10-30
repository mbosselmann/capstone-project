import styled from 'styled-components/macro'
import { Link, useParams } from 'react-router-dom'
import back from '../images/back-to.svg'
import burger from '../images/burger.svg'
import burgerOpen from '../images/burger-open.svg'
import { useState } from 'react'
import setLocalStorage from '../lib/saveToLocal'
import getToday from '../utils/getToday'

function BookDetails({ books, onHandleSetBooks }) {
  const { id } = useParams()
  const book = books.find(book => book.id === id)
  const [isOpen, setIsOpen] = useState(false)

  function handleBookStatusUpdate(book) {
    const updatedBook = {
      ...book,
      finished: !book.finished,
      readingSince: book.readingSince ? book.readingSince : getToday(),
      finishedOn: book.finished ? book.finished : getToday(),
    }
    const updatedBookList = books.filter(b => b.id !== book.id)
    const newBooklist = [updatedBook, ...updatedBookList]
    onHandleSetBooks(newBooklist)
    setLocalStorage('books', newBooklist)
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
        <DropDownMenu>
          <MenuButton onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <img src={burgerOpen} alt="close drop down menu" />
            ) : (
              <img src={burger} alt="open drop down menu" />
            )}
          </MenuButton>
          {isOpen && (
            <div>
              {book.finished ? (
                <button
                  onClick={() => {
                    handleBookStatusUpdate(book)
                    setIsOpen(!isOpen)
                  }}
                >
                  Not finished yet?
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleBookStatusUpdate(book)
                    setIsOpen(!isOpen)
                  }}
                >
                  Finished?
                </button>
              )}
            </div>
          )}
        </DropDownMenu>
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

const ActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.4rem;
`

const DropDownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    position: absolute;
    z-index: 1;
    top: 60px;
    margin-right: 1rem;
    border-radius: 5px;
    border: 0.2rem solid #fff;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }

  div button {
    height: 2rem;
    padding: 0 0.5rem;
    background-color: #fff;
    border: none;
  }
`

const MenuButton = styled.button`
  width: 60px;
  height: 60px;
  margin-right: 0.2rem;
  border: none;
  background-color: transparent;
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

import styled from 'styled-components/macro'
import handleAuthorsLength from '../utils/handleAuthorsLength'
import { Link } from 'react-router-dom'

function Book({
  id,
  bookCover,
  title,
  authors,
  readingStatus,
  readingStatusDate,
  finishedOn,
}) {
  return (
    <LinkBookDetails to={`/book/${id}`}>
      <Wrapper>
        <ImgContainer>
          <img src={bookCover} alt="bookcover" />
        </ImgContainer>
        <Content>
          <div>
            <h3>{title}</h3>
            <p>
              by
              {handleAuthorsLength(authors)}
            </p>
          </div>
          <div>
            <div>
              {!readingStatus
                ? `Reading since: ${readingStatusDate}`
                : `Finished on: ${finishedOn}`}
            </div>
          </div>
        </Content>
      </Wrapper>
    </LinkBookDetails>
  )
}

export default Book

const Wrapper = styled.li`
  border-radius: 5px;
  background-color: #fff;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  height: 180px;
  padding-right: 5px;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
`

const LinkBookDetails = styled(Link)`
  text-decoration: none;
  color: #000;
`

const ImgContainer = styled.div`
  flex: 1;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px 0 0 5px;

  img {
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
    max-width: 80%;
    max-height: 130px;
    margin: 1rem;
  }
`

const Content = styled.div`
  flex: 2;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

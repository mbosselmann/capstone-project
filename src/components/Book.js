import styled from 'styled-components/macro'

function Book({
  bookCover,
  title,
  authors,
  readingStatus,
  readingStatusDate,
  finishedSince,
}) {
  function authorsLength(authors) {
    if (authors.length === 2) {
      if (authors[0].includes(authors[1])) {
        return ` ${authors[0]}`
      }
      return ` ${authors[0]} and ${authors[1]}`
    } else if (authors > 2) {
      return ` ${authors[0]} and others`
    } else {
      return ` ${authors}`
    }
  }

  return (
    <Wrapper>
      <ImgContainer>
        <img src={bookCover} alt="bookcover" />
      </ImgContainer>
      <Content>
        <div>
          <h3>{title}</h3>
          <p>
            by
            {authorsLength(authors)}
          </p>
        </div>
        <div>
          <div>{!readingStatus ? '' : 'Rating'}</div>
          <div>
            {!readingStatus
              ? `Reading since: ${readingStatusDate}`
              : `Finished since: ${finishedSince}`}
          </div>
        </div>
      </Content>
    </Wrapper>
  )
}

export default Book

const Wrapper = styled.li`
  border-radius: 5px;
  margin: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  height: 180px;
  padding-right: 5px;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);
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
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
  }
`

import styled from 'styled-components/macro'

function Book({
  bookCover,
  title,
  authors,
  readingStatus,
  readingStatusDate,
  finishedSince,
}) {
  // this function is a workaround for fixing wrong author data
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
  margin: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  min-height: 150px;
  box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
`
const ImgContainer = styled.div`
  flex: 1;
  background-color: #f6f6f6;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
    width: 60%;
    margin: 10px 10px;
  }
`

const Content = styled.div`
  flex: 2;
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

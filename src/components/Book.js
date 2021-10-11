import styled from 'styled-components'

function Book(props) {
  return (
    <Wrapper>
      <Img>
        <div>
          <img src={props.bookCover} alt="bookcover" />
        </div>
      </Img>
      <Content>
        <div>
          <h3>{props.title}</h3>
          <p>
            by
            {props.authors.length > 1
              ? ` ${props.authors[0]}`
              : ` ${props.authors}`}
          </p>
        </div>
        <div>
          <div>{!props.readingStatus ? '' : 'Rating'}</div>
          <div>
            {!props.readingStatus
              ? `Reading since: ${props.readingStatusDate}`
              : `
        Finished since: ${props.finishedSince}`}
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
const Img = styled.div`
  flex: 1;
  background-color: #f6f6f6;
  display: flex;

  div {
    width: 100%;
    margin: 10px auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div img {
    width: 60%;
    box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
  }
`

const Content = styled.div`
  flex: 2;
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

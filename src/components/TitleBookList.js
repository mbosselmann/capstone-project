import styled from 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import fish from '../images/fish.svg'
import getLocalStorage from '../lib/loadFromLocal'

function TitleBookList({ username, onHandleSetFishMessage }) {
  const isFish = getLocalStorage('fish') || ''
  const { pathname } = useLocation()

  if (pathname === '/library') {
    return (
      <div>
        <h2>Your library</h2>
        <p>These are all your books that you already read:</p>
      </div>
    )
  }
  if (pathname === '/currently-reading') {
    return (
      <>
        <TitleContainer>
          <h2>Hi {username}! </h2>
          {isFish && (
            <div>
              <button onClick={() => onHandleSetFishMessage('Gotcha!')}>
                <img src={fish} alt="klammerfisch" />
              </button>
            </div>
          )}
        </TitleContainer>
        <p>
          Welcome back! Here is the list of books that you are currently
          reading:
        </p>
      </>
    )
  } else {
    return ''
  }
}

export default TitleBookList

const TitleContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  width: 100%;
  max-width: 600px;
  margin-bottom: 0;
  gap: 20%;

  div {
    height: 50px;
    margin-bottom: 0;
    width: 50px;
  }

  h2 {
    height: 50px;
    margin-top: 0.3rem;
  }

  button {
    height: 35px;
    width: 35px;
    border: none;
    border-radius: 50%;
    background-color: var(--button-bg-color-primary);
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }

  img {
    height: 55px;
    width: 55px;
  }
  button {
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #003a45;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
    margin: 0 1rem 0.5rem 0;
  }
`

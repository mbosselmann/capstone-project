import readaholicLogo from '../images/readaholic-logo.svg'
import styled from 'styled-components/macro'
import setLocalStorage from '../lib/saveToLocal'
import { useHistory } from 'react-router'

function Start({ onHandleSetUsername }) {
  const history = useHistory()

  function handleSubmit(startEvent) {
    startEvent.preventDefault()
    const form = startEvent.target
    const { username } = form.elements
    setLocalStorage('user', username.value)
    onHandleSetUsername(username.value)
    history.push('/currently-reading')
  }

  return (
    <Wrapper>
      <img src={readaholicLogo} alt="readaholic" />
      <h1>Readaholic</h1>
      <form
        onSubmit={event => {
          handleSubmit(event)
        }}
      >
        <label htmlFor="name" aria-label="username">
          Enter your name:
        </label>
        <input
          type="text"
          name="username"
          id="name"
          placeholder="Your name"
          autoComplete="off"
          required
        />
        <button>Start</button>
      </form>
    </Wrapper>
  )
}

export default Start

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 7rem auto 0 auto;
  max-width: 90%;

  img {
    width: 80%;
    margin: 0 auto;
  }

  h1 {
    font-family: var(--font-family-special);
    font-size: 3.5rem;
    text-align: center;
    color: var(--font-color-dark);
    margin-top: 0.5rem;
  }

  form {
    margin-top: 3rem;
  }
`

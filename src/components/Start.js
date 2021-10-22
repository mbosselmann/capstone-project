import readaholicLogo from '../images/readaholic-logo.svg'
import styled from 'styled-components/macro'

function Start({ setUsername }) {
  function handleSubmit(startEvent) {
    startEvent.preventDefault()
    const form = startEvent.target
    const { username } = form.elements
    setUsername(username.value)
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
    font-family: 'Libre Baskerville', serif;
    font-size: 3.5rem;
    text-align: center;
    color: #4a4453;
    margin-top: 0.5rem;
  }
`

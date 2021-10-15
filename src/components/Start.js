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
      <Form
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
          required
        />
        <button>Start</button>
      </Form>
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;

  label {
    font-size: 0.9rem;
    margin-bottom: 0.2rem;
    margin-left: 0.6rem;
  }

  input {
    width: 98%;
    border: 2px solid #c8c4c4;
    background-color: #f6f6f6;
    color: #4a4453;
    border-radius: 5px;
    height: 2.5rem;
    margin: 0 auto 1rem auto;
    padding-left: 10px;
  }

  input::placeholder {
    color: #c8c4c4;
  }

  input:focus {
    outline: none;
    width: 100%;
    height: 2.6rem;
  }

  input:-webkit-autofill {
    box-shadow: 0 0 0 50px #f6f6f6 inset;
    -webkit-box-shadow: 0 0 0 50px #f6f6f6 inset;
  }

  button {
    height: 2.5rem;
    font-size: 1.2rem;
    width: 98%;
    margin: 0 auto;
    background-color: #4a4453;
    color: #fff;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }

  button:focus {
    width: 100%;
    height: 2.6rem;
  }
`

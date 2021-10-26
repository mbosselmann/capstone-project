import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, sans-serif;
    }

    :root {
        --box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
    }

      h2 {
    font-size: 2rem;
    font-weight: 600;
    font-family: 'Libre Baskerville', serif;
    margin-bottom: 0.5rem;
  }


    form {
        display: flex;
        flex-direction: column;
    }

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

    form button {
        height: 2.5rem;
        font-size: 1.2rem;
        font-weight: 600;
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

    form button:focus {
        width: 100%;
        height: 2.6rem;
    }
`

export default GlobalStyles

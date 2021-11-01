import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, sans-serif;

    }

    ::-webkit-scrollbar {
    display: none;
}

    :root {
        --box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
        --bg-color-main: #ffffff;
        --bg-color-light: #f6f6f6;
        --bg-color-dark: #4a4453;
        --font-color-main: #000000;
        --font-color-light: #ffffff;
        --font-color-dark: #4a4453;
        --input-color: #c8c4c4;
        --button-bg-color-default: #4a4453;
        --button-bg-color-primary: #006a75;
        --button-bg-color-secondary: #504465;
        --border-radius-normal: 25px;
        --border-radius-normal-bottom: 0 0 25px 25px;
        --border-radius-normal-top: 25px 25px 0 0;
        --border-radius-small: 5px;
        --font-weight-bold: 600;
        --link-color-dark: #504465;
        --navlink-color-dark: #4a4453;
        --navlink-color-light: #ffffff;
        --font-family-special: 'Libre Baskerville', serif;

    }

    body {
        background-color: var(--bg-color-main);
        font-size: 1rem;
        color: var(--font-color-dark);

    }

    h2 {
        font-size: 2rem;
        font-weight: var(--font-weight-bold);
        font-family: var(--font-family-special)
    }

    h3 {
        font-size: 1.1rem;
        font-weight: var(--font-weight-bold);
        margin-bottom: 0.2rem;
    }

    form {
        display: flex;
        flex-direction: column;
        background-color: var(--bg-color-main);
    }

    label {
        font-size: 0.9rem;
        margin-bottom: 0.2rem;
        margin-left: 0.6rem;
    }

    input {
        width: 98%;
        border: 2px solid var(--input-color);
        background-color: var(--bg-color-light);
        color: var(--font-color-dark);
        border-radius: var(--border-radius-small);
        height: 2.5rem;
        margin: 0 auto 1rem auto;
        padding-left: 10px;
    }

    input::placeholder {
        color: var(--input-color);
    }

    input:focus {
        outline: none;
        width: 100%;
        height: 2.6rem;
    }

    input:-webkit-autofill {
        box-shadow: 0 0 0 50px var(--bg-color-light) inset;
        -webkit-box-shadow: 0 0 0 50px var(--bg-color-light) inset;
    }

    form button {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2.5rem;
        font-size: 1.2rem;
        font-weight: var(--font-weight-bold);
        width: 98%;
        margin: 0 auto;
        background-color: var(--button-bg-color-default);
        color: var(--font-color-light);
        border: none;
        border-radius: var(--border-radius-small);
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

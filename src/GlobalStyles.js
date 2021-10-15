import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

    * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif, sans-serif;    }

    :root {
        --box-shadow: 5px 4px 10px 0px rgba(0, 0, 0, 0.25);
    }
`

export default GlobalStyles

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ScrollToTop from './utils/ScrollToTop'
import reportWebVitals from './reportWebVitals'
import GlobalStyles from './GlobalStyles'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <GlobalStyles />
      <ScrollToTop />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

reportWebVitals()

import { render, screen } from '@testing-library/react'
import TitleBookList from './TitleBookList'
import { MemoryRouter as Router, Route } from 'react-router-dom'

describe('Title for BookList Component', () => {
  it('returns correct title according to readingStatus= "currentlyReading" and username', () => {
    render(
      <Router initialEntries={['/currently-reading']}>
        <Route path="/currently-reading">
          <TitleBookList username={'Mareike'} />
        </Route>
      </Router>
    )

    const titleHeading = screen.getByText('Hi Mareike!')
    expect(titleHeading).toBeInTheDocument()

    const titleParagraph = screen.getByText(
      'Welcome back! Here is the list of books that you are currently reading:'
    )
    expect(titleParagraph).toBeInTheDocument()
  })

  it('returns correct title according to readingStatus= "finishedBooks"', () => {
    render(
      <Router initialEntries={['/library']}>
        <Route path="/library">
          <TitleBookList />
        </Route>
      </Router>
    )

    const titleHeading = screen.getByText('Your library')
    expect(titleHeading).toBeInTheDocument()

    const titleParagraph = screen.getByText(
      'These are all your books that you already read:'
    )
    expect(titleParagraph).toBeInTheDocument()
  })
})

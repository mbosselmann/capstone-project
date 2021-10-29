import { render, screen } from '@testing-library/react'
import AddBook from './AddBook'
import { MemoryRouter as Router } from 'react-router-dom'

describe('AddBook', () => {
  it('has a link to return to "add-book"', () => {
    render(
      <Router>
        <AddBook />
      </Router>
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })

  it('has an image with an alt-text', () => {
    render(
      <Router>
        <AddBook />
      </Router>
    )

    const altText = screen.getByAltText('back to start adding a new book')
    expect(altText).toBeInTheDocument()
  })
})

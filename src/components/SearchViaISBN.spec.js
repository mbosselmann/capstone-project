import { render, screen } from '@testing-library/react'
import SearchViaISBN from './SearchViaISBN'
import { MemoryRouter as Router } from 'react-router-dom'

describe('SearchViaISBN', () => {
  it('has one input field with the type "text"', () => {
    render(
      <Router>
        <SearchViaISBN />
      </Router>
    )

    const inputElISBN = screen.getByLabelText(
      'Please insert the ISBN of the book you want to add to your book list:'
    )
    expect(inputElISBN).toHaveAttribute('type', 'text')
  })

  it('has an input field for the ISBN search that is required', () => {
    render(
      <Router>
        <SearchViaISBN />
      </Router>
    )

    const inputElISBN = screen.getByLabelText(
      'Please insert the ISBN of the book you want to add to your book list:'
    )
    expect(inputElISBN).toHaveAttribute('required')
  })

  it('has a search button', () => {
    render(
      <Router>
        <SearchViaISBN />
      </Router>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Search')
  })

  it('has a link', () => {
    render(
      <Router>
        <SearchViaISBN />
      </Router>
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})

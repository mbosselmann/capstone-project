import { render, screen } from '@testing-library/react'
import StartAddBook from './AddBookStart'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('StartAddBook', () => {
  const date = new Date()
  const today =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  it('has one input field with the type "text"', () => {
    render(
      <Router>
        <StartAddBook />
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
        <StartAddBook />
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
        <StartAddBook />
      </Router>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Search')
  })

  it('has a link', () => {
    render(
      <Router>
        <StartAddBook />
      </Router>
    )

    const link = screen.getByRole('link')
    expect(link).toBeInTheDocument()
  })
})

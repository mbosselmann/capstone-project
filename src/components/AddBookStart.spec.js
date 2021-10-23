import { render, screen } from '@testing-library/react'
import StartAddBook from './AddBookStart'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('StartAddBook', () => {
  it('has one input field with the type "number"', () => {
    render(
      <Router>
        <StartAddBook />
      </Router>
    )

    const inputElISBN = screen.getByLabelText(
      'Please insert the ISBN of the book you want to add to your book list:'
    )
    expect(inputElISBN).toHaveAttribute('type', 'number')
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

  it('calls with the input of "isbn"', () => {
    const mockOnHandleISBNSearch = jest.fn()

    render(
      <Router>
        <StartAddBook onHandleISBNSearch={mockOnHandleISBNSearch} />
      </Router>
    )
    const button = screen.getByRole('button')
    const inputElISBN = screen.getByLabelText(
      'Please insert the ISBN of the book you want to add to your book list:'
    )

    userEvent.type(inputElISBN, '9783551518415')
    userEvent.click(button)
    expect(mockOnHandleISBNSearch).toHaveBeenCalledWith('9783551518415')
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

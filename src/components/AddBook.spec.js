import { render, screen } from '@testing-library/react'
import AddBook from './AddBook'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import setLocalStorage from '../lib/saveToLocal'

describe('AddBook', () => {
  it('renders heading', () => {
    render(<AddBook />)

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('New book:')
  })

  it('has two required input fields (title and authors)', () => {
    render(<AddBook />)

    const inputElTitle = screen.getByLabelText('Book title:')
    expect(inputElTitle).toBeRequired()

    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    expect(inputElAuthors).toBeRequired()
  })

  it('displays image with alt-text', () => {
    render(<AddBook />)

    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })

  it('has an input field "Reading since" with the type "date"', () => {
    render(<AddBook />)
    const inputElReadingSince = screen.getByLabelText('Reading since:')
    expect(inputElReadingSince).toHaveAttribute('type', 'date')
  })

  it('has an input field "Currently on page" with the type "number"', () => {
    render(<AddBook />)
    const inputElReadingSince = screen.getByLabelText('Currently on page:')
    expect(inputElReadingSince).toHaveAttribute('type', 'number')
  })

  it('has an input field for uploading a bookcover with the type "file"', () => {
    render(<AddBook />)
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('type', 'file')
  })

  it('has an input field for uploading a bookcover that only accepts .png and .jpeg files', () => {
    render(<AddBook />)
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('accept', '.png, .jpeg, .jpg')
  })

  it('saves the new list of books in LocalStorage', () => {
    const history = createMemoryHistory()
    const mockSetBooks = jest.fn()
    const spyLocalStorage = jest.spyOn(
      Object.getPrototypeOf(window.localStorage),
      'setItem'
    )

    render(
      <Router history={history}>
        <AddBook books={'book'} setBooks={mockSetBooks} />
      </Router>
    )
    setLocalStorage('books', 'new book')
    expect(spyLocalStorage).toHaveBeenCalledWith('books', '"new book"')
  })
})

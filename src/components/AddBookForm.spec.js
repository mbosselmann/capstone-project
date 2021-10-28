import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBookForm from './AddBookForm'
import getToday from '../utils/getToday'

describe('AddBookForm', () => {
  it('renders heading', () => {
    render(<AddBookForm />)

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('New book:')
  })

  it('has two required input fields (title and authors)', () => {
    render(<AddBookForm />)

    const inputElTitle = screen.getByLabelText('Book title:')
    expect(inputElTitle).toBeRequired()

    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    expect(inputElAuthors).toBeRequired()
  })

  it('displays image with alt-text', () => {
    render(<AddBookForm />)

    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })

  it('has an input field "Reading since" with the type "date" and the attribute "max"', () => {
    render(<AddBookForm />)

    const inputElReadingSince = screen.getByLabelText('Reading since:')
    expect(inputElReadingSince).toHaveAttribute('type', 'date')
    expect(inputElReadingSince).toHaveAttribute('max', getToday())
  })

  it('has an input field "Currently on page" with the type "number"', () => {
    render(<AddBookForm />)
    const inputElOnPage = screen.getByLabelText('Currently on page:')
    expect(inputElOnPage).toHaveAttribute('type', 'number')
  })

  it('has an input field for uploading a bookcover with the type "file"', () => {
    render(<AddBookForm />)
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('type', 'file')
  })

  it('has an input field for uploading a bookcover that only accepts .png and .jpeg files', () => {
    render(<AddBookForm />)
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('accept', '.png, .jpeg, .jpg')
  })

  it('calls onCreateNewBook with values of form', () => {
    const mockOnHandleCreateNewBook = jest.fn()

    render(<AddBookForm onHandleCreateNewBook={mockOnHandleCreateNewBook} />)

    const inputElTitle = screen.getByLabelText('Book title:')
    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    const inputElReadingSince = screen.getByLabelText('Reading since:')
    const inputElOnPage = screen.getByLabelText('Currently on page:')

    userEvent.type(inputElTitle, 'Das Haus')
    userEvent.type(inputElAuthors, 'Marie Meier')
    userEvent.type(inputElReadingSince, getToday())
    userEvent.type(inputElOnPage, '10')

    const button = screen.getByRole('button')
    userEvent.click(button)
    expect(mockOnHandleCreateNewBook).toHaveBeenCalledTimes(1)

    expect(mockOnHandleCreateNewBook).toHaveBeenCalledWith({
      title: 'Das Haus',
      authors: 'Marie Meier',
      readingSince: getToday(),
      onPage: '10',
      thumbnail: 'placeholder.png',
      isbn10: '',
      isbn13: '',
      description: '',
      pages: '',
      publisher: 'Unknown',
      subtitle: '',
      year: 'Unknown',
    })
  })

  it('calls onGetBookCoverPreview when input file types changes', () => {
    const mockOnGetBookCoverPreview = jest.fn()
    global.URL.createObjectURL = jest.fn()

    render(<AddBookForm onGetBookCoverPreview={mockOnGetBookCoverPreview} />)

    const inputElBookcover = screen.getByLabelText('Select')
    userEvent.upload(inputElBookcover)
    expect(mockOnGetBookCoverPreview).toHaveBeenCalledTimes(1)
  })
})

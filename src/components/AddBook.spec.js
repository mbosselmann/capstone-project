import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBook from './AddBook'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { MemoryRouter } from 'react-router-dom'

describe('AddBook', () => {
  const date = new Date()
  const today =
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()

  it('renders heading', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('New book:')
  })

  it('has two required input fields (title and authors)', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )

    const inputElTitle = screen.getByLabelText('Book title:')
    expect(inputElTitle).toBeRequired()

    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    expect(inputElAuthors).toBeRequired()
  })

  it('displays image with alt-text', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )

    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })

  it('has an input field "Reading since" with the type "date" and the attribute "max"', () => {
    render(
      <MemoryRouter>
        <AddBook today={today} />
      </MemoryRouter>
    )

    const inputElReadingSince = screen.getByLabelText('Reading since:')
    expect(inputElReadingSince).toHaveAttribute('type', 'date')
    expect(inputElReadingSince).toHaveAttribute('max', today)
  })

  it('has an input field "Currently on page" with the type "number"', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )
    const inputElOnPage = screen.getByLabelText('Currently on page:')
    expect(inputElOnPage).toHaveAttribute('type', 'number')
  })

  it('has an input field for uploading a bookcover with the type "file"', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('type', 'file')
  })

  it('has an input field for uploading a bookcover that only accepts .png and .jpeg files', () => {
    render(
      <MemoryRouter>
        <AddBook />
      </MemoryRouter>
    )
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('accept', '.png, .jpeg, .jpg')
  })

  it('calls onCreateNewBook with values of form', () => {
    const history = createMemoryHistory()
    const mockOnHandleCreateNewBook = jest.fn()

    render(
      <Router history={history}>
        <AddBook onHandleCreateNewBook={mockOnHandleCreateNewBook} />
      </Router>
    )

    const inputElTitle = screen.getByLabelText('Book title:')
    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    const inputElReadingSince = screen.getByLabelText('Reading since:')
    const inputElOnPage = screen.getByLabelText('Currently on page:')

    userEvent.type(inputElTitle, 'Das Haus')
    userEvent.type(inputElAuthors, 'Marie Meier')
    userEvent.type(inputElReadingSince, today)
    userEvent.type(inputElOnPage, '10')

    const button = screen.getByRole('button')
    userEvent.click(button)

    expect(mockOnHandleCreateNewBook).toHaveBeenCalledWith({
      title: 'Das Haus',
      authors: 'Marie Meier',
      readingSince: today,
      onPage: '10',
      identifier: '',
      thumbnail: 'placeholder.png',
    })
  })

  it('calls onGetBookCoverPreview when input file types changes', () => {
    const mockOnGetBookCoverPreview = jest.fn()
    global.URL.createObjectURL = jest.fn()

    render(
      <MemoryRouter>
        <AddBook onGetBookCoverPreview={mockOnGetBookCoverPreview} />
      </MemoryRouter>
    )

    const inputElBookcover = screen.getByLabelText('Select')
    userEvent.upload(inputElBookcover)
    expect(mockOnGetBookCoverPreview).toHaveBeenCalledTimes(1)
  })
})

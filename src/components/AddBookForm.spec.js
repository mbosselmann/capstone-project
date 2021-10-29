import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBookForm from './AddBookForm'
import getToday from '../utils/getToday'
import placeholder from '../images/placeholder.png'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'

describe('AddBookForm', () => {
  const history = createMemoryHistory()

  it('renders heading', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )

    const title = screen.getByRole('heading', { level: 2 })
    expect(title).toHaveTextContent('New book:')
  })

  it('has two required input fields (title and authors)', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )

    const inputElTitle = screen.getByLabelText('Book title:')
    expect(inputElTitle).toBeRequired()

    const inputElAuthors = screen.getByLabelText('Author or Authors:')
    expect(inputElAuthors).toBeRequired()
  })

  it('displays image with alt-text', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )

    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })

  it('has an input field "Reading since" with the type "date" and the attribute "max"', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )

    const inputElReadingSince = screen.getByLabelText('Reading since:')
    expect(inputElReadingSince).toHaveAttribute('type', 'date')
    expect(inputElReadingSince).toHaveAttribute('max', getToday())
  })

  it('has an input field "Currently on page" with the type "number"', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )
    const inputElOnPage = screen.getByLabelText('Currently on page:')
    expect(inputElOnPage).toHaveAttribute('type', 'number')
  })

  it('has an input field for uploading a bookcover with the type "file"', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('type', 'file')
  })

  it('has an input field for uploading a bookcover that only accepts .png and .jpeg files', () => {
    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )
    const inputElBookcover = screen.getByLabelText('Select')
    expect(inputElBookcover).toHaveAttribute('accept', '.png, .jpeg, .jpg')
  })

  it('uploads file', () => {
    const file = new File(['placeholder'], placeholder, {
      type: 'image/png',
    })

    render(
      <Router history={history}>
        <AddBookForm />
      </Router>
    )

    const inputElBookcover = screen.getByLabelText('Select')
    userEvent.upload(inputElBookcover, file)
    expect(inputElBookcover.files[0]).toStrictEqual(file)
  })

  it('calls onCreateNewBook with values of form', () => {
    const mockOnHandleCreateNewBook = jest.fn()
    const mockOnHandlSetSuccessMessage = jest.fn()

    render(
      <Router history={history}>
        <AddBookForm
          onHandleCreateNewBook={mockOnHandleCreateNewBook}
          onHandleSetSuccessMessage={mockOnHandlSetSuccessMessage}
        />
      </Router>
    )

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

    expect(mockOnHandleCreateNewBook).toHaveBeenCalledWith({
      title: 'Das Haus',
      authors: 'Marie Meier',
      readingSince: getToday(),
      onPage: '10',
      thumbnail: placeholder,
      isbn10: '',
      isbn13: '',
      description: '',
      pages: '',
      publisher: 'Unknown',
      subtitle: '',
      year: 'Unknown',
    })
  })
})

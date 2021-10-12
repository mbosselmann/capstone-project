import { render, screen } from '@testing-library/react'
import BookList from './BookList'
import placeholder from '../images/placeholder.png'
import userEvent from '@testing-library/user-event'

describe('Book list', () => {
  const books = [
    {
      id: '1',
      volumeInfo: {
        title: 'Harry Potter and the Goblet of Fire',
        authors: ['J. K. Rowling'],
        imageLinks: {
          thumbnail: placeholder,
        },
      },
      finished: false,
      readingSince: '05/2021',
      finishedSince: '',
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Cathedral of the Sea',
        authors: ['Ildefonso Falcones de Sierra'],
        imageLinks: {
          thumbnail: placeholder,
        },
      },
      finished: true,
      readingSince: '05/2021',
      finishedSince: '08/2021',
    },
  ]

  it('renders two listitems', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <BookList
        books={books}
        handleActiveReadingStatus={mockOnHandleActiveReadingStatus}
      />
    )

    const bookListItems = screen.getAllByRole('listitem')
    expect(bookListItems).toHaveLength(2)
  })

  it('has two buttons', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <BookList
        books={books}
        handleActiveReadingStatus={mockOnHandleActiveReadingStatus}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('renders correct title according to readingStatus= "true"', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <BookList
        readingStatus={'true'}
        books={books}
        handleActiveReadingStatus={mockOnHandleActiveReadingStatus}
      />
    )

    const title = screen.getByRole('heading', { level: 2 })
    const buttons = screen.getAllByRole('button')
    const finishedBooksButton = buttons[1]
    expect(title).toBeInTheDocument()
    userEvent.click(finishedBooksButton)
    const titleFinishedBooks = screen.getByText(
      'Your library of finished books:'
    )
    expect(titleFinishedBooks).toBeInTheDocument()
  })

  it('renders correct title according to readingStatus= "false"', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <BookList
        readingStatus={'false'}
        books={books}
        handleActiveReadingStatus={mockOnHandleActiveReadingStatus}
      />
    )

    const title = screen.getByRole('heading', { level: 2 })
    const buttons = screen.getAllByRole('button')
    const readBooksButton = buttons[0]
    expect(title).toBeInTheDocument()
    userEvent.click(readBooksButton)
    const titleFinishedBooks = screen.getByText(
      'Your library of books currently read:'
    )
    expect(titleFinishedBooks).toBeInTheDocument()
  })

  it('renders only one item after click on button', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <BookList
        readingStatus={'false'}
        books={books}
        handleActiveReadingStatus={mockOnHandleActiveReadingStatus}
      />
    )

    const buttons = screen.getAllByRole('button')
    const readBooksButton = buttons[0]
    userEvent.click(readBooksButton)
    const bookListItems = screen.getAllByRole('listitem')
    expect(bookListItems).toHaveLength(1)
  })
})

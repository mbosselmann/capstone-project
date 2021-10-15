import { render, screen } from '@testing-library/react'
import BookList from './BookList'
import placeholder from '../images/placeholder.png'

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
    render(<BookList books={books} readingStatus={''} />)

    const bookListItems = screen.getAllByRole('listitem')
    expect(bookListItems).toHaveLength(2)
  })

  it('renders no title according to readingStatus=""', () => {
    render(<BookList books={books} readingStatus={''} />)

    const titleSection = screen.getByTestId('booklist-title')
    expect(titleSection).toHaveTextContent('')
  })
})

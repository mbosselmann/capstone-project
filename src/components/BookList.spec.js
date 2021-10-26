import { render, screen } from '@testing-library/react'
import BookList from './BookList'
import placeholder from '../images/placeholder.png'

describe('Book list', () => {
  const books = [
    {
      id: '1',
      title: 'Harry Potter and the Goblet of Fire',
      authors: ['J. K. Rowling'],
      thumbnail: placeholder,
      finished: false,
      readingSince: '05/2021',
      finishedSince: '',
    },
    {
      id: '2',
      title: 'Cathedral of the Sea',
      authors: ['Ildefonso Falcones de Sierra'],
      thumbnail: placeholder,
      finished: true,
      readingSince: '05/2021',
      finishedSince: '08/2021',
    },
  ]

  it('renders  one listitem when status is "/library"', () => {
    render(<BookList books={books} status={'/library'} />)

    const bookListItems = screen.getAllByRole('listitem')
    expect(bookListItems).toHaveLength(1)
  })

  it('renders  one listitem when status is not "/library"', () => {
    render(<BookList books={books} status={'/currently-reading'} />)

    const bookListItems = screen.getAllByRole('listitem')
    expect(bookListItems).toHaveLength(1)
  })

  it('renders no title according to status=""', () => {
    render(<BookList books={books} status={''} />)

    const titleSection = screen.getByTestId('booklist-title')
    expect(titleSection).toBeEmptyDOMElement()
  })
})

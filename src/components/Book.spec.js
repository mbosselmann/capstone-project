import { render, screen } from '@testing-library/react'
import Book from './Book'
import placeholder from '../images/placeholder.png'

describe('Book', () => {
  const books = [
    {
      id: '1',
      bookCover: placeholder,
      title: 'Harry Potter and the Goblet of Fire',
      authors: ['J. K. Rowling'],
      finished: false,
      readingSince: '05/2021',
      finishedSince: '',
    },
    {
      id: '2',
      bookCover: placeholder,
      title: 'Cathedral of the Sea',
      authors: ['Ildefonso Falcones de Sierra'],
      finished: true,
      readingSince: '05/2021',
      finishedSince: '08/2021',
    },
  ]

  it('renders book currently read', () => {
    render(
      <Book
        key={books[0].id}
        title={books[0].title}
        authors={books[0].authors}
        readingStatus={books[0].finished}
        readingStatusDate={books[0].readingSince}
        finishedSince={books[0].finishedSince}
        bookCover={books[0].bookCover}
      />
    )

    const book = screen.getByRole('listitem')
    expect(book).toBeInTheDocument()
  })

  it('renders book that is already read', () => {
    render(
      <Book
        key={books[1].id}
        title={books[1].title}
        authors={books[1].authors}
        readingStatus={books[1].finished}
        readingStatusDate={books[1].readingSince}
        finishedSince={books[1].finishedSince}
        bookCover={books[1].bookCover}
      />
    )

    const book = screen.getByRole('listitem')
    expect(book).toBeInTheDocument()
  })

  it('renders listitem with correct text', () => {
    render(
      <Book
        key={books[1].id}
        title={books[1].title}
        authors={books[1].authors}
        readingStatus={books[1].finished}
        readingStatusDate={books[1].readingSince}
        finishedSince={books[1].finishedSince}
        bookCover={books[1].bookCover}
      />
    )

    const listitemContent = screen.getByRole('listitem')
    expect(listitemContent).toBeInTheDocument(`
      ${books[1].title}, ${books[1].authors}, ${books[1].readingSince}, ${books[1].finishedSince}
      `)
  })

  it('displays image', () => {
    render(
      <Book
        key={books[1].id}
        title={books[1].title}
        authors={books[1].authors}
        readingStatus={books[1].finished}
        readingStatusDate={books[1].readingSince}
        finishedSince={books[1].finishedSince}
        bookCover={books[1].bookCover}
      />
    )
    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${books[1].bookCover}`)
  })
})

import { render, screen } from '@testing-library/react'
import Book from './Book'
import placeholder from '../images/placeholder.png'

describe('Book', () => {
  it('renders book currently read', () => {
    render(
      <Book
        key={'1'}
        title={'Harry Potter and the Goblet of Fire'}
        authors={['J. K. Rowling']}
        readingStatus={false}
        readingStatusDate={'05/2021'}
        finishedSince={''}
        bookCover={placeholder}
      />
    )

    const book = screen.getByRole('listitem')
    expect(book).toBeInTheDocument()
  })

  it('renders book that is already read', () => {
    render(
      <Book
        key={'2'}
        title={'Cathedral of the Sea'}
        authors={['Ildefonso Falcones de Sierra']}
        readingStatus={true}
        readingStatusDate={'05/2021'}
        finishedSince={'08/2021'}
        bookCover={placeholder}
      />
    )

    const book = screen.getByRole('listitem')
    expect(book).toBeInTheDocument()
  })

  it('renders listitem with correct text', () => {
    render(
      <Book
        key={'2'}
        title={'Cathedral of the Sea'}
        authors={['Ildefonso Falcones de Sierra']}
        readingStatus={true}
        readingStatusDate={'05/2021'}
        finishedSince={'08/2021'}
        bookCover={placeholder}
      />
    )

    expect(screen.getByText('Cathedral of the Sea')).toBeInTheDocument()
    expect(
      screen.getByText('by Ildefonso Falcones de Sierra')
    ).toBeInTheDocument()
    expect(screen.getByText('Finished since: 08/2021')).toBeInTheDocument()
  })

  it('displays image', () => {
    render(
      <Book
        key={'2'}
        title={'Cathedral of the Sea'}
        authors={['Ildefonso Falcones de Sierra']}
        readingStatus={true}
        readingStatusDate={'05/2021'}
        finishedSince={'08/2021'}
        bookCover={placeholder}
      />
    )
    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${placeholder}`)
  })

  it('displayed image has an alt-text', () => {
    render(
      <Book
        key={'2'}
        title={'Cathedral of the Sea'}
        authors={['Ildefonso Falcones de Sierra']}
        readingStatus={true}
        readingStatusDate={'05/2021'}
        finishedSince={'08/2021'}
        bookCover={placeholder}
      />
    )
    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })
})

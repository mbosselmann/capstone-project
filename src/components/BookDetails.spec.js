import { render, screen } from '@testing-library/react'
import BookDetails from './BookDetails'
import placeholder from '../images/placeholder.png'
import { MemoryRouter as Router, Route } from 'react-router-dom'

describe('BookDetails', () => {
  const book = [
    {
      authors: 'J. K. Rowling',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nunc in sem semper commodo. Morbi maximus justo mi, sed auctor velit auctor ac. In vitae semper mauris. Aenean congue mauris rhoncus ipsum consequat, eget porta elit pellentesque.',
      finished: false,
      finishedSince: '',
      id: '1HJDB34567',
      isbn10: '123456',
      isbn13: '1234567',
      onPage: '34',
      pages: '345',
      publisher: 'Publisher',
      readingSince: '05/2021',
      subtitle: 'Ravenclaw Edition',
      thumbnail: placeholder,
      title: 'Harry Potter and the Goblet of Fire',
      year: '2020',
    },
  ]

  it('renders book details', () => {
    render(
      <Router initialEntries={['/book/1HJDB34567']}>
        <Route path="/book/:id">
          <BookDetails books={book} />
        </Route>
      </Router>
    )

    const bookDetails = screen.getByRole('article')
    expect(bookDetails).toBeInTheDocument()
  })

  it('has an bookcover image with an alt-text', () => {
    render(
      <Router initialEntries={['/book/1HJDB34567']}>
        <Route path="/book/:id">
          <BookDetails books={book} />
        </Route>
      </Router>
    )

    const altText = screen.getByAltText('bookcover')
    expect(altText).toBeInTheDocument()
  })

  it('renders book details wth correct text', () => {
    render(
      <Router initialEntries={['/book/1HJDB34567']}>
        <Route path="/book/:id">
          <BookDetails books={book} />
        </Route>
      </Router>
    )

    const bookDetails = screen.getByRole('article')
    expect(bookDetails).toHaveTextContent(
      'Harry Potter and the Goblet of Fire',
      'by J. K. Rowling',
      'Ravenclaw Edition',
      'Published: 2020',
      'Publisher: Publisher',
      'Pages: 345',
      'Reading since: 05/2021',
      'Currently on page: 34/345',
      'Description:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus tincidunt nunc in sem semper commodo. Morbi maximus justo mi, sed auctor velit auctor ac. In vitae semper mauris. Aenean congue mauris rhoncus ipsum consequat, eget porta elit pellentesque.'
    )
  })
})

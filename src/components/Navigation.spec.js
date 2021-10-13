import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'
import placeholder from '../images/placeholder.png'

describe('Navigation', () => {
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

  it('renders two links', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const links = screen.getAllByRole('link')
    expect(links).toHaveLength(2)
  })

  it('changes to active when "currently reading" link is clicked', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <Router>
        <Navigation
          books={books}
          onHandleActiveReadingStatus={mockOnHandleActiveReadingStatus}
        />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    userEvent.click(linkCurrentlyReading)
    expect(linkCurrentlyReading).toHaveClass('is-active')
  })

  it(`doesn't change the "finished reading" to active when "currently reading" link is clicked`, () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <Router>
        <Navigation
          books={books}
          onHandleActiveReadingStatus={mockOnHandleActiveReadingStatus}
        />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    const linkFinishedReading = links[1]
    userEvent.click(linkCurrentlyReading)
    expect(linkFinishedReading).not.toHaveClass('is-active')
  })

  it('changes to active when "finished reading" link is clicked', () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <Router>
        <Navigation
          books={books}
          onHandleActiveReadingStatus={mockOnHandleActiveReadingStatus}
        />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkFinishedReading = links[1]
    userEvent.click(linkFinishedReading)
    expect(linkFinishedReading).toHaveClass('is-active')
  })

  it(`doesn't change the "currently reading" link to active when "finished reading" link is clicked`, () => {
    const mockOnHandleActiveReadingStatus = jest.fn()

    render(
      <Router>
        <Navigation
          books={books}
          onHandleActiveReadingStatus={mockOnHandleActiveReadingStatus}
        />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    const linkFinishedReading = links[1]
    userEvent.click(linkFinishedReading)
    expect(linkCurrentlyReading).not.toHaveClass('is-active')
  })
})

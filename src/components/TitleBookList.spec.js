import { render, screen } from '@testing-library/react'
import TitleBookList from './TitleBookList'

describe('Title for BookList Component', () => {
  it('returns correct title according to readingStatus= "currentlyReading" and username', () => {
    render(<TitleBookList status={'/currently-reading'} username={'Mareike'} />)

    const titleHeading = screen.getByText('Hi Mareike!')
    expect(titleHeading).toBeInTheDocument()

    const titleParagraph = screen.getByText(
      'Welcome back! Here is the list of books that you are currently reading:'
    )
    expect(titleParagraph).toBeInTheDocument()
  })

  it('returns correct title according to readingStatus= "finishedBooks"', () => {
    render(<TitleBookList status={'/library'} />)

    const titleHeading = screen.getByText('Your library')
    expect(titleHeading).toBeInTheDocument()

    const titleParagraph = screen.getByText(
      'These are all your books that you already read:'
    )
    expect(titleParagraph).toBeInTheDocument()
  })
})

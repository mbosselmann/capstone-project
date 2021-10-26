import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import HomeScreen from './HomeScreen'

describe('HomeScreen', () => {
  it('displays image', () => {
    render(<HomeScreen />)

    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument()
  })

  it('displays image with alt-text', () => {
    render(<HomeScreen />)

    const altText = screen.getByAltText('readaholic')
    expect(altText).toBeInTheDocument()
  })

  it('shows heading with name of app', () => {
    render(<HomeScreen />)

    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Readaholic')
  })

  it('has an input field where the user has to enter his name', () => {
    render(<HomeScreen />)

    const inputEl = screen.getByLabelText('Enter your name:')
    expect(inputEl).toBeRequired()
  })

  it('user can type "Mareike" in input', () => {
    render(<HomeScreen />)

    const inputEl = screen.getByLabelText('Enter your name:')
    userEvent.type(inputEl, 'Mareike')
    expect(inputEl).toHaveValue('Mareike')
  })
})

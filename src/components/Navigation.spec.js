import { render, screen } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Navigation from './Navigation'

describe('Navigation', () => {
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
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    userEvent.click(linkCurrentlyReading)
    expect(linkCurrentlyReading).toHaveClass('is-active')
  })

  it(`doesn't change the "finished reading" to active when "currently reading" link is clicked`, () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    const linkFinishedReading = links[1]
    userEvent.click(linkCurrentlyReading)
    expect(linkFinishedReading).not.toHaveClass('is-active')
  })

  it('changes to active when "finished reading" link is clicked', () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkFinishedReading = links[1]
    userEvent.click(linkFinishedReading)
    expect(linkFinishedReading).toHaveClass('is-active')
  })

  it(`doesn't change the "currently reading" link to active when "finished reading" link is clicked`, () => {
    render(
      <Router>
        <Navigation />
      </Router>
    )

    const links = screen.getAllByRole('link')
    const linkCurrentlyReading = links[0]
    const linkFinishedReading = links[1]
    userEvent.click(linkFinishedReading)
    expect(linkCurrentlyReading).not.toHaveClass('is-active')
  })
})

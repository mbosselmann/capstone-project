import { render, screen } from '@testing-library/react'
import Message from './Message'
import error from '../images/error.svg'
import success from '../images/success.svg'

describe('Message', () => {
  it('renders error message with correct text', () => {
    render(<Message image={error} altText="error" message="Error!" />)

    expect(screen.getByText('Error!')).toBeInTheDocument()
  })

  it('displays error image', () => {
    render(<Message image={error} altText="error" message="Error!" />)

    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${error}`)
  })

  it('displayed error image has an alt-text', () => {
    render(<Message image={error} altText="error" message="Error!" />)

    const altText = screen.getByAltText('error')
    expect(altText).toBeInTheDocument()
  })

  it('renders success message with correct text', () => {
    render(<Message image={success} altText="success" message="Success!" />)

    expect(screen.getByText('Success!')).toBeInTheDocument()
  })

  it('displays success image', () => {
    render(<Message image={success} altText="success" message="Success!" />)

    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${success}`)
  })

  it('displayed success image has an alt-text', () => {
    render(<Message image={success} altText="success" message="Success!" />)

    const altText = screen.getByAltText('success')
    expect(altText).toBeInTheDocument()
  })
})

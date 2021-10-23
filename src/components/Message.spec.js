import { render, screen } from '@testing-library/react'
import Message from './Message'
import error from '../images/error.svg'
import success from '../images/success.svg'

describe('Message', () => {
  it('renders error message with correct text', () => {
    render(
      <Message image={error} altText="error" message="Error!" text="Oh no!" />
    )

    expect(screen.getByText('Error!')).toBeInTheDocument()
    expect(screen.getByText('Oh no!')).toBeInTheDocument()
  })

  it('displays error image', () => {
    render(
      <Message image={error} altText="error" message="Error!" text="Oh no!" />
    )

    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${error}`)
  })

  it('displayed error image has an alt-text', () => {
    render(
      <Message image={error} altText="error" message="Error!" text="Oh no!" />
    )

    const altText = screen.getByAltText('error')
    expect(altText).toBeInTheDocument()
  })

  it('renders success message with correct text', () => {
    render(
      <Message
        image={success}
        altText="success"
        message="Success!"
        text="Yay!"
      />
    )

    expect(screen.getByText('Success!')).toBeInTheDocument()
    expect(screen.getByText('Yay!')).toBeInTheDocument()
  })

  it('displays error image', () => {
    render(
      <Message
        image={success}
        altText="success"
        message="Success!"
        text="Yay!"
      />
    )

    const displayedImage = screen.getByRole('img')
    expect(displayedImage).toBeInTheDocument(`${success}`)
  })

  it('displayed success image has an alt-text', () => {
    render(
      <Message
        image={success}
        altText="success"
        message="Success!"
        text="Yay!"
      />
    )

    const altText = screen.getByAltText('success')
    expect(altText).toBeInTheDocument()
  })
})

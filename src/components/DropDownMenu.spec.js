import DropDownMenu from './DropDownMenu'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Drop down menu', () => {
  const bookUnfinished = {
    finished: false,
  }

  const bookFinished = {
    finished: true,
  }

  it('renders accordingly to reading status "finished: true"', () => {
    render(<DropDownMenu book={bookFinished} />)

    const button = screen.getByRole('button')
    userEvent.click(button)
    const buttons = screen.getAllByRole('button')
    const notFinishedButton = buttons[1]
    expect(notFinishedButton).toHaveTextContent('Not finished yet?')
  })

  it('renders accordingly to reading status "finished: false"', () => {
    render(<DropDownMenu book={bookUnfinished} />)

    const button = screen.getByRole('button')
    userEvent.click(button)
    const buttons = screen.getAllByRole('button')
    const finishedButton = buttons[1]
    expect(finishedButton).toHaveTextContent('Finished?')
  })
})

import { render, screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UpdatePage from './UpdatePage'

describe('UpdatePage', () => {
  const book = {
    pages: '400',
  }
  it('renders one input field and two button', () => {
    render(<UpdatePage book={book} />)

    const inputEl = screen.getByLabelText('On which page are you now?')
    expect(inputEl).toBeInTheDocument()
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })

  it('has an update button', () => {
    render(<UpdatePage book={book} />)

    const buttons = screen.getAllByRole('button')
    const updateButton = buttons[0]
    expect(updateButton).toHaveTextContent('Update')
  })

  it('has an cancel button', () => {
    render(<UpdatePage book={book} />)

    const buttons = screen.getAllByRole('button')
    const cancelButton = buttons[1]
    expect(cancelButton).toHaveTextContent('Cancel')
  })

  it('is called with new page number', () => {
    const mockOnHandleUpdateBookList = jest.fn()
    const mockOnHandleSetUpdatePage = jest.fn()

    render(
      <UpdatePage
        book={book}
        onHandleUpdateBookList={mockOnHandleUpdateBookList}
        onHandleSetUpdatePage={mockOnHandleSetUpdatePage}
      />
    )

    const inputEl = screen.getByLabelText('On which page are you now?')
    const buttons = screen.getAllByRole('button')
    const updateButton = buttons[0]

    userEvent.type(inputEl, '45')
    userEvent.click(updateButton)

    expect(mockOnHandleUpdateBookList).toHaveBeenCalledWith({
      onPage: '45',
      pages: '400',
    })
  })

  it('cancels the submit of new page number with clicking on cancel button', () => {
    const mockOnHandleSetUpdatePage = jest.fn()

    render(
      <UpdatePage
        book={book}
        onHandleSetUpdatePage={mockOnHandleSetUpdatePage}
      />
    )

    const inputEl = screen.getByLabelText('On which page are you now?')
    const buttons = screen.getAllByRole('button')
    const cancelButton = buttons[1]

    userEvent.type(inputEl, '45')
    userEvent.click(cancelButton)

    expect(mockOnHandleSetUpdatePage).not.toHaveBeenCalledWith('45')
  })
})

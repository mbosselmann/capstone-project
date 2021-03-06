import styled from 'styled-components/macro'
import updatePageImage from '../images/update-page.svg'

export default function UpdatePage({
  book,
  onHandleSetUpdatePage,
  onHandleUpdateBookList,
  onHandleSetUpdateMessage,
}) {
  function handleSubmit(event) {
    event.preventDefault()
    const form = event.target
    const { nowOnPage } = form.elements
    const updatedPage = {
      ...book,
      onPage: nowOnPage.value,
    }
    onHandleUpdateBookList(updatedPage)
    onHandleSetUpdatePage()
    onHandleSetUpdateMessage('Updated!')
    form.reset()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <img src={updatePageImage} alt="" />
        <label htmlFor="nowOnPage">On which page are you now?</label>
        <input
          type="number"
          id="nowOnPage"
          name="nowOnPage"
          placeholder="e. g. 45"
          min="0"
          max={book.pages}
          required
          autoFocus
        />
        <UpdateButton>Update</UpdateButton>
        <CancelButton type="button" onClick={onHandleSetUpdatePage}>
          Cancel
        </CancelButton>
      </div>
    </Form>
  )
}

const Form = styled.form`
  position: absolute;
  top: 0;
  width: 100%;
  max-width: 600px;
  padding: 1rem 2rem 2rem;
  border-radius: var(--border-radius-normal-bottom);
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);

  label {
    font-size: 1.2rem;
    font-weight: var(--font-weight-bold);
    margin: 0.5rem 0;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  button {
    margin: 0.5rem 0;
    width: 100%;
  }
`

const UpdateButton = styled.button`
  background-color: var(--button-bg-color-primary);
`
const CancelButton = styled.button`
  background-color: var(--button-bg-color-secondary);
`

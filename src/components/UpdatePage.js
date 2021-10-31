import styled from 'styled-components/macro'
import updatePageImage from '../images/update-page.svg'

export default function UpdatePage({
  book,
  onHandleSetUpdatePage,
  onHandleUpdateBookList,
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
          max={book.pages}
          required
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
  z-index: 10;
  top: 0;
  margin: 0 auto;
  background-color: #fff;
  width: 100%;
  padding: 1rem 2rem 2rem;
  border-radius: 0 0 25px 25px;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);

  label {
    font-size: 1.2rem;
    font-weight: 600;
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
  }
`

const UpdateButton = styled.button`
  background-color: #006a75;
`
const CancelButton = styled.button`
  background-color: #00252f;
`

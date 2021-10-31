import styled from 'styled-components/macro'
import burger from '../images/burger.svg'
import burgerOpen from '../images/burger-open.svg'
import { useState } from 'react'

export default function DropDownMenu({ book, onHandleBookStatusUpdate }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Wrapper>
      <MenuButton onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img src={burgerOpen} alt="close drop down menu" />
        ) : (
          <img src={burger} alt="open drop down menu" />
        )}
      </MenuButton>
      {isOpen && (
        <div>
          {book.finished ? (
            <button
              onClick={() => {
                onHandleBookStatusUpdate(book)
                setIsOpen(!isOpen)
              }}
            >
              Not finished yet?
            </button>
          ) : (
            <button
              onClick={() => {
                onHandleBookStatusUpdate(book)
                setIsOpen(!isOpen)
              }}
            >
              Finished?
            </button>
          )}
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  div {
    position: absolute;
    z-index: 1;
    top: 65px;
    margin-right: 1rem;
    border-radius: 5px;
    border: 0.2rem solid #fff;
    background-color: #fff;
    box-shadow: var(--box-shadow);
    -webkit-box-shadow: var(--box-shadow);
  }

  div button {
    width: 200px;
    display: flex;
    font-size: 1rem;
    justify-content: flex-end;
    align-items: center;
    height: 3rem;
    padding: 1rem;
    background-color: #fff;
    border: none;
    border-radius: 5px;
    text-transform: uppercase;
  }
`

const MenuButton = styled.button`
  width: 60px;
  height: 60px;
  margin-right: 0.2rem;
  border: none;
  background-color: transparent;
`

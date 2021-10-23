import { keyframes } from 'styled-components'
import styled from 'styled-components/macro'

function Message({ image, altText, message, text }) {
  return (
    <Transition>
      <Wrapper>
        <img src={image} alt={altText} />
        <p>{message}</p>
        <p>{text}</p>
      </Wrapper>
    </Transition>
  )
}

const animation = keyframes`

from {
  margin-top: 0%;
  width: 100%;
}

20% {
  margin-top: 300px;
}

80% {
  margin-top: 300px;
}

to {
margin-top: 0%;
width: 100%;
}
`

const Transition = styled.div`
  position: absolute;
  top: -300px;
  animation-duration: 5s;
  animation-name: ${animation};
  animation-iteration-count: 1;
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.5rem;
  background-color: #fff;
  color: #000;
  height: 300px;
  border-radius: 0 0 25px 25px;
  box-shadow: var(--box-shadow);
  -webkit-box-shadow: var(--box-shadow);

  img {
    max-width: 70%;
    align-self: center;
    margin: 1rem 0;
    height: 100px;
  }
`

export default Message

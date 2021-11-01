import styled, { keyframes } from 'styled-components/macro'

function Message({ image, altText, message }) {
  return (
    <Wrapper>
      <img src={image} alt={altText} />
      <Text>{message}</Text>
    </Wrapper>
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

const Wrapper = styled.div`
  max-width: 600px;
  position: absolute;
  top: -300px;
  animation-duration: 5s;
  animation-name: ${animation};
  animation-iteration-count: 1;
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
  padding: 2rem;
  z-index: 100;

  img {
    max-width: 70%;
    align-self: center;
    margin: 1rem 0;
    height: 100px;
  }
`
const Text = styled.p`
  font-size: 1rem;
  font-weight: 600;
`
export default Message

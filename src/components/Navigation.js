import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

function Navigation({ books, onHandleActiveReadingStatus }) {
  return (
    <Wrapper>
      <NavBarLink
        to="/currently-reading"
        onClick={() => {
          onHandleActiveReadingStatus('currentlyReading', books)
        }}
      >
        Currently Reading
      </NavBarLink>
      <NavBarLink
        to="/library"
        onClick={() => {
          onHandleActiveReadingStatus('finishedBooks', books)
        }}
      >
        Finished Reading
      </NavBarLink>
    </Wrapper>
  )
}

export default Navigation

const Wrapper = styled.nav`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afa8ba;
`

const NavBarLink = styled(NavLink)`
  flex: 1;
  text-align: center;
  text-decoration: none;
  color: #fff;
`

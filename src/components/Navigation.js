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
        activeClassName="is-active"
      >
        Currently Reading
      </NavBarLink>
      <NavBarLink
        to="/library"
        onClick={() => {
          onHandleActiveReadingStatus('finishedBooks', books)
        }}
        activeClassName="is-active"
      >
        Finished Reading
      </NavBarLink>
    </Wrapper>
  )
}

export default Navigation

const Wrapper = styled.nav`
  width: 100%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #afa8ba;
`

const NavBarLink = styled(NavLink)`
  flex: 1;
  padding: 1.4rem;
  text-align: center;
  text-decoration: none;
  color: #000;
  background-color: #afa8ba;

  &.${props => props.activeClassName} {
    background-color: #4b5878;
    color: #fff;
  }
`

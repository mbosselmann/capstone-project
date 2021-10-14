import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

function Navigation({ books, onHandleBookList }) {
  return (
    <Wrapper>
      <NavBarLink
        to="/currently-reading"
        onClick={() => {
          onHandleBookList('currentlyReading', books)
        }}
        activeClassName="is-active"
      >
        Currently Reading
      </NavBarLink>
      <NavBarLink
        to="/library"
        onClick={() => {
          onHandleBookList('finishedBooks', books)
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
`

const NavBarLink = styled(NavLink)`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  text-align: center;
  text-decoration: none;
  color: #4a4453;
  background-color: #fff;

  &.${props => props.activeClassName} {
    background-color: #4b5878;
    color: #fff;
  }
`

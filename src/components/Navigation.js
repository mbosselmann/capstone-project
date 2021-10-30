import { NavLink } from 'react-router-dom'
import styled from 'styled-components/macro'

function Navigation() {
  return (
    <Wrapper>
      <NavBarLinkCurrentlyReading
        to="/currently-reading"
        activeClassName="is-active"
      />
      <NavBarLinkLibrary to="/library" activeClassName="is-active" />
      <NavBarLinkAddBook to="/add-book" activeClassName="is-active" />
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
  -webkit-box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.25);
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
  background-image: url('/images/currently-reading.svg');
  background-repeat: no-repeat;
  background-color: #fff;
  background-size: 3rem;
  background-position: center;

  &.${props => props.activeClassName} {
    background-color: #4a4453;
    color: #fff;
  }
`

const NavBarLinkCurrentlyReading = styled(NavBarLink)`
  background-image: url('/images/currently-reading.svg');
  background-repeat: no-repeat;

  &.${props => props.activeClassName} {
    background-image: url('/images/currently-reading-active.svg');
  }
`
const NavBarLinkLibrary = styled(NavBarLink)`
  background-image: url('/images/library.svg');
  background-repeat: no-repeat;

  &.${props => props.activeClassName} {
    background-image: url('/images/library-active.svg');
  }
`
const NavBarLinkAddBook = styled(NavBarLink)`
  background-image: url('/images/add-book.svg');
  background-repeat: no-repeat;

  &.${props => props.activeClassName} {
    background-image: url('/images/add-book-active.svg');
  }
`

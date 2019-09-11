import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
  padding: 0.1em;
  background: var(--primary);
  border: 0;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5em;
`;
const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
`;
const StyledNavLink = styled(NavLink)`
  display: inline-block;
  padding: 1em;
  text-decoration: none;
  padding: 0.5em 1em;
  color: #fff;
  &.nav-active {
    background: #fff;
    color: #555;
  }
`;

export { Nav, NavList, StyledNavLink };

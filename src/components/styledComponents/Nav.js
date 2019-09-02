import styled from 'styled-components';

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
const NavItem = styled.li`
  & a,
  button {
    display: inline-block;
    padding: 1em;
    text-decoration: none;
    color: white;
  }
  & button {
    background: transparent;
  }
  & .active {
    color: #3596f3;
  }
`;

export { Nav, NavList, NavItem };

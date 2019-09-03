import React, { Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AppRouter from 'components/AppRouter';
import privateRoutes from 'routes/privateRoutes';
import { AuthContext } from 'components/AuthContext';
import { Nav, NavItem, NavList } from 'components/styledComponents/Nav';
import { StyledPadded } from 'components/styledComponents/Containers';

const Main = () => {
  // this component is only for illustration.
  // replace this with app's private routes
  const { signOut } = useContext(AuthContext);

  return (
    <Fragment>
      <Nav>
        <p>CDI</p>
        <NavList>
          <NavItem>
            <NavLink to="/dashboard" activeClassName="active">
              Dashboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/users" activeClassName="active">
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <button href="" onClick={() => signOut()}>
              Sign Out
            </button>
          </NavItem>
        </NavList>
      </Nav>
      <main>
        {/* <h2>Hello, Disruptor</h2> */}
        <StyledPadded>
          <AppRouter routes={privateRoutes} />
        </StyledPadded>
      </main>
    </Fragment>
  );
};

export default Main;

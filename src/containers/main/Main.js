import React, { Fragment, useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import AppRouter from 'components/AppRouter';
import privateRoutes from 'routes/privateRoutes';
import { AuthContext } from 'components/AuthContext';
// import { StyledNavLink } from 'components/styledComponents/Nav';
import { StyledPadded } from 'components/styledComponents/Containers';

const user = JSON.parse(localStorage.user);
const Main = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <Fragment>
      <Navbar
        className="justify-content-between"
        variant="dark"
        color="primary"
      >
        <Nav>
          <Navbar.Brand>Game of the Generals</Navbar.Brand>
          {/* <StyledNavLink to="/dashboard" activeClassName="nav-active">
            Game Board
          </StyledNavLink> */}

          {/* <button href="" onClick={() => signOut()}>
            Sign Out
					</button> */}
        </Nav>
        <Nav>
          <Nav.Link
            onClick={() => signOut(user)}
          >{`Signed in as: ${user.name}`}</Nav.Link>
        </Nav>
      </Navbar>
      <AppRouter routes={privateRoutes} />
    </Fragment>
  );
};

export default Main;

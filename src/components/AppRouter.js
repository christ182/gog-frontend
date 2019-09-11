import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { AuthContext } from 'components/AuthContext';

const AppRouter = ({ routes }) => {
  const { is_authenticated } = useContext(AuthContext);
  const defaultPage = () => {
    return is_authenticated === true ? (
      <Redirect to="/game-of-the-generals" />
    ) : (
      <Redirect to="/home" />
    );
  };

  return (
    <Switch>
      {routes.map((route, index) =>
        route.component ? (
          <Route
            key={index}
            path={route.path}
            component={route.component}
            exact={route.exact === undefined ? false : route.exact}
          />
        ) : (
          route.render && (
            <Route
              key={index}
              path={route.path}
              render={route.render}
              exact={route.exact === undefined ? false : route.exact}
            />
          )
        ),
      )}
      {<Route component={defaultPage} />}
    </Switch>
  );
};

AppRouter.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default AppRouter;
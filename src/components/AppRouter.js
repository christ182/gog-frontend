import React, { useContext } from 'react';
import { AuthContext } from 'components/AuthContext';
import { Redirect, Route, Switch } from 'react-router-dom';

const AppRouter = ({ routes }) => {
  const { is_authenticated } = useContext(AuthContext);
  const defaultPage = () => {
    return is_authenticated === true ? (
      <Redirect to="/dashboard" />
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
        )
      )}
      {<Route component={defaultPage} />}
    </Switch>
  );
};

export default AppRouter;

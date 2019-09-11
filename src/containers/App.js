import React, { Suspense, lazy, useContext } from 'react';
import { Socket } from 'react-socket-io';

import AppRouter from 'components/AppRouter';
import ErrorBoundary from 'components/ErrorBoundary';
import publicRoutes from 'routes/publicRoutes';
import { AuthContext } from 'components/AuthContext';

const url = process.env.REACT_APP_URL;
const token = localStorage.user ? JSON.parse(localStorage.user).token : '';
const options = {
  transports: ['websocket'],
  query: 'token=' + token,
};
const Main = lazy(() => import('containers/main/Main'));

const App = () => {
  const { is_authenticated } = useContext(AuthContext);

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          // replace with a loading component
          <div>Loading...</div>
        }
      >
        {is_authenticated === true ? (
          // insert private routes
          <Socket uri={url} options={options}>
            <Main />
          </Socket>
        ) : (
          // insert public routes
          <AppRouter routes={publicRoutes} />
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

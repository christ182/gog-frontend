import React, { Suspense, lazy, useContext } from 'react';

import AppRouter from 'components/AppRouter';
import ErrorBoundary from 'components/ErrorBoundary';

// import privateRoutes from 'routes/privateRoutes';
import publicRoutes from 'routes/publicRoutes';
import { AuthContext } from 'components/AuthContext';

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
          <Main />
        ) : (
          // <AppRouter routes={privateRoutes} />
          // insert public routes
          <AppRouter routes={publicRoutes} />
        )}
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;

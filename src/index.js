import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from 'containers/App';
import GlobalStyle from 'containers/styles';
import { AuthProvider } from 'components/AuthContext';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <GlobalStyle />
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

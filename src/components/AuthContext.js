import React, { createContext, useState } from 'react';
import useAPI from 'utils/useApiService';
import { withRouter } from 'react-router-dom';

const AuthContext = createContext();
const Provider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

const Auth = props => {
  const auth = localStorage.is_authenticated
    ? JSON.parse(localStorage.is_authenticated)
    : false;
  const [is_authenticated, setAuthValue] = useState(auth);
  const { post } = useAPI();

  const value = {
    signIn: signIn,
    signOut: signOut,
    is_authenticated: is_authenticated,
  };

  function signIn(body) {
    // replace this with the app's proper authentication
    post('/login', body)
      .then(res => {
        localStorage.setItem('is_authenticated', true);
        localStorage.setItem('token', res.token);
        setAuthValue(true);
        props.history.push('/main');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function signOut() {
    // replace this with the app's proper authentication
    // localStorage.removeItem('is_authenticated');
    localStorage.clear();
    props.history.push('/home');
    setAuthValue(false);
  }

  return <Provider value={value}>{props.children}</Provider>;
};

const AuthProvider = withRouter(Auth);
export { AuthContext, AuthProvider, AuthConsumer };

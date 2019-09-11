import ApiService from 'utils/ApiService';
import React, { createContext, useState } from 'react';
import { withRouter } from 'react-router-dom';

const AuthContext = createContext();
const Provider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

const Auth = props => {
  const auth = localStorage.is_authenticated
    ? JSON.parse(localStorage.is_authenticated)
    : false;
  const [is_authenticated, setAuthValue] = useState(auth);
  const { post } = ApiService();

  const value = {
    signIn: signIn,
    signOut: signOut,
    is_authenticated: is_authenticated,
  };

  function signIn(body) {
    post('/auth/sign-in', body)
      .then(res => {
        localStorage.setItem('is_authenticated', true);
        localStorage.setItem('user', JSON.stringify(res.data));
        setAuthValue(true);
        props.history.push('/main');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function signOut() {
    localStorage.clear();
    props.history.push('/home');
    setAuthValue(false);
  }

  return <Provider value={value}>{props.children}</Provider>;
};

const AuthProvider = withRouter(Auth);
export { AuthContext, AuthProvider, AuthConsumer };

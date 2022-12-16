/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

import { getAccessToken } from '../services/api';

const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  onLogin: (accessToken) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const initialToken = getAccessToken();
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const loginHandler = (accessToken) => {
    setToken(accessToken);
  };

  const logoutHandler = () => {
    Cookies.remove('token');
    setToken(null);
  };

  const ctxValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    onLogin: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };

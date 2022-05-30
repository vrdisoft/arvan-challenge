import React, { createContext, useContext, useState, useCallback } from "react";

const TokenContext = createContext({});
type TokenType = {
  token: string;
  isLoggedIn: boolean;
  loginContext: (token: string) => void;
  logoutContext: () => void;
};

const useToken = () => {
  const tokenContext = useContext(TokenContext) as TokenType;
  return {
    token: tokenContext.token,
    isLoggedIn: tokenContext.isLoggedIn,
    loginContext: tokenContext.loginContext,
    logoutContext: tokenContext.logoutContext,
  };
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");

  return {
    storedToken,
  };
};

const TokenProvider = ({ ...rest }) => {
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.storedToken;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const loginHandler = (currentToken: string) => {
    setToken(currentToken);
    localStorage.setItem("token", currentToken);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    loginContext: loginHandler,
    logoutContext: logoutHandler,
  };

  return <TokenContext.Provider value={contextValue} {...rest} />;
};

export { TokenProvider, useToken };

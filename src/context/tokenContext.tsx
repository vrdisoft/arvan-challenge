import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

const TokenContext = createContext({});
type TokenType = {
  token: string;
  username: string;
  isLoggedIn: boolean;
  loginContext: (token: string, username: string) => void;
  logoutContext: () => void;
};

const useToken = () => {
  const tokenContext = useContext(TokenContext) as TokenType;
  return {
    token: tokenContext.token,
    username: tokenContext.username,
    isLoggedIn: tokenContext.isLoggedIn,
    loginContext: tokenContext.loginContext,
    logoutContext: tokenContext.logoutContext,
  };
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedUsername = localStorage.getItem("username");
  return {
    storedToken,
    storedUsername,
  };
};

const TokenProvider = ({ ...rest }) => {
  const tokenData = retrieveStoredToken();

  let initialToken, initialUsername;
  if (tokenData) {
    initialToken = tokenData.storedToken;
    initialUsername = tokenData.storedUsername;
  }

  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialUsername);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    setUsername(null);
    localStorage.removeItem("username");
  }, []);

  const loginHandler = useCallback(
    (currentToken: string, currentUsername: string) => {
      setToken(currentToken);
      setUsername(currentUsername);
      localStorage.setItem("token", currentToken);
      localStorage.setItem("username", currentUsername);
    },
    []
  );

  const contextValue = useMemo(() => {
    return {
      token: token,
      username: username,
      isLoggedIn: userIsLoggedIn,
      loginContext: loginHandler,
      logoutContext: logoutHandler,
    };
  }, [token, username, userIsLoggedIn, loginHandler, logoutHandler]);
  return <TokenContext.Provider value={contextValue} {...rest} />;
};

export { TokenProvider, useToken };

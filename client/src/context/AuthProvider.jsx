import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({
  isLoggedIn: false,
  onLogin: (token,data) => {},
  onLogout: () => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
      setToken(storedToken);
      setData(JSON.parse(localStorage.getItem('data')));
    }
  }, []);

  const loginHandler = (token,data) => {
    setIsLoggedIn(true);
    setToken(token);
    setData(data);
    localStorage.setItem('token', token);
    localStorage.setItem('data', JSON.stringify(data));
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setToken("");
    setData({});
    localStorage.removeItem('token');
    localStorage.removeItem('data');
  };

  const contextValue = {
    isLoggedIn: isLoggedIn,
    data: data,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
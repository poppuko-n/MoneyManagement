import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    axios.get(`${apiBaseUrl}/session`, { withCredentials: true })
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  const login = async (credentials) => {
    await axios.post(`${apiBaseUrl}/session`, credentials, { withCredentials: true });
    setIsLoggedIn(true);
    alert("ログインしました。");
  };

  const logout = async () => {
    await axios.delete(`${apiBaseUrl}/session`, { withCredentials: true });
    setIsLoggedIn(false);
    alert("ログアウトしました。");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

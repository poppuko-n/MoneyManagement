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

  const login = async (siginInUser) => {
    try{
      setIsLoggedIn(true);
      await axios.post(`${apiBaseUrl}/session`, siginInUser, { withCredentials: true });
      alert("ログインしました。");
    } catch(error) {
      alert(error.response.data.errors.join('\n'))
    }
  };

  const logout = async () => {
    await axios.delete(`${apiBaseUrl}/session`, { withCredentials: true });
    setIsLoggedIn(false);
    alert("ログアウトしました。");
  };

  const createUser = async(newUser) => {
    try{
      await axios.post(`${apiBaseUrl}/users`, { user: newUser }, { withCredentials: true });
      setIsLoggedIn(true);
      alert("登録完了しました。")
    } catch(error) {
      alert(error.response.data.errors.join('\n'));
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

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
      await axios.post(`${apiBaseUrl}/session`, siginInUser, { withCredentials: true });
      setIsLoggedIn(true);
      alert("ログインしました。");
    } catch(error) {
      alert(error.response?.data.errors.join('\n')|| "ログインに失敗しました。再度お試しください。")
    }
  };

  const logout = async () => {
    try{
      await axios.delete(`${apiBaseUrl}/session`, { withCredentials: true });
      setIsLoggedIn(false);
      alert("ログアウトしました。");
    } catch(error) {
      alert("ログアウトに失敗しました。再度お試しください。")
    }
  };

  const createUser = async(newUser) => {
    try{
      await axios.post(`${apiBaseUrl}/users`, { user: newUser }, { withCredentials: true });
      setIsLoggedIn(true);
      alert("登録完了しました。")
    } catch(error) {
      alert(error.response?.data.errors.join('\n') || "登録に失敗しました。再度お試しください。");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, createUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

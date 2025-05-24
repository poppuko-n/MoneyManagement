import { createContext, useContext, useEffect, useState } from 'react';

// 認証情報を管理・提供するContextを作成
const AuthContext = createContext();

// 認証状態を管理するProviderコンポーネント
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  // コンポーネントがマウントされたときにlocalStorageからtokenを再取得
  // これはリロード時に状態が失われるのを防ぐための安全策
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  }, []);

   // ログイン関数：新しいトークンをlocalStorageと状態に保存
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // ログアウト関数：トークンを削除し、状態もクリア
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    alert("ログアウトしました。")
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

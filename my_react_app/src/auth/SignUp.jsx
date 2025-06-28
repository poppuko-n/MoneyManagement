import { useState } from 'react';
import { useAuth } from "../contexts/Authcontext.jsx"

const SignUp = ({ onBack }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    password_confirmation: null
  });

  const { createUser } = useAuth();

  const handleCreate = () => {
      createUser(newUser);
      onBack();
    };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-6 text-center text-indigo-700">会員登録</h1>

      <form onSubmit={(e)=>{
        e.preventDefault();
        handleCreate();
        }}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">名前</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="ユーザー名を入力"
            autoComplete="username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
          <input
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            placeholder="パスワードを入力"
            autoComplete="new-password"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            登録
          </button>
          <button
            onClick={onBack}
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-md transition duration-200"
          >
            戻る
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;

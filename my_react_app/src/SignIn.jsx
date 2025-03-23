import { useState } from 'react';
import UserApi from './lib/UserApi'

const SignIn = ({ onBack }) => {
  const [siginInUser, setSiginInUser] = useState({
    name: "",
    password: "",
  })

  const handleSignIn = () => {
    UserApi.signUpUser(siginInUser).then(() => {
      onBack()
    })
  };

  return(
  <div>
    <h1 className="text-2xl font-bold mb-6 text-center">ログイン</h1>

    <div>
      <label className="block text-sm font-medium text-gray-700">名前</label>
      <input
        type="string"
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={siginInUser.name}
        onChange={(e) => setSiginInUser({ ...siginInUser, name: e.target.value })}
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">パスワード</label>
      <input
        type="password"
        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        value={siginInUser.password}
        onChange={(e) => setSiginInUser({ ...siginInUser, password: e.target.value })}
      />
    </div>

    <div className="mt-6 flex justify-end space-x-4">
      <button
        onClick={handleSignIn}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        ログイン
      </button>
    </div>
  </div>
  )
}

export default SignIn;
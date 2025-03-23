import axios from "axios";

class UserApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static createUser(user) {
    return axios
      .post(`${this.apiBaseUrl}/users`, {user: user})
      .then(() => {
        alert("登録が完了しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`)
      })
  };

  static signUpUser(user) {
    return axios
      .post(`${this.apiBaseUrl}/login`, user)
      .then(() => {
        alert("ログインが成功しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors}`)
      })
  }

};

export default UserApi;
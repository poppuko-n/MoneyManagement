import axios from "axios";

class CompanyApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static getCompanies() {
    return axios
      .get(`${this.apiBaseUrl}/companies`)
      .catch(error => {
        alert("データの取得に失敗しました。")
      })
  }

  static getSimulations(payload) {
    return axios
      .post(`${this.apiBaseUrl}/simulations`, payload)
      .catch(error => {
        alert("データの送信に失敗しました。")
      })
  }
}

export default CompanyApi;
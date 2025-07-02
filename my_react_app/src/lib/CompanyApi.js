import axios from "axios";

class CompanyApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static async getCompanies() {
    const response = await axios.get(`${this.apiBaseUrl}/companies`)
    return response.data
  }

  static async createProjections(payload) {
    const response = await axios.post(
      `${this.apiBaseUrl}/stock_prices/projections`,
      payload
    );
    return response.data;
  }

  static createProjectionsAnalyses(payload) {
    return axios
      .post(`${this.apiBaseUrl}/stock_prices/projection_analyses`, payload)
      .catch(error => {
        alert("データの送信に失敗しました。")
      })
  }
}

export default CompanyApi;
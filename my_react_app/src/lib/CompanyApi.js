import axios from "axios";

class CompanyApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static async getCompanies() {
    const response = await axios.get(`${this.apiBaseUrl}/companies`)
    return response.data
  }

  static async getProjections(payload) {
    const response = await axios.get(`${this.apiBaseUrl}/stock_prices/projections`, {
      params: { data: JSON.stringify(payload) }
    });
    return response.data;
  }

  static getProjectionAnalyses(payload) {
    return axios.get(`${this.apiBaseUrl}/stock_prices/projection_analyses`, {
      params: { data: JSON.stringify(payload) }
    }).catch(error => {
      alert("データの取得に失敗しました。")
    })
  }
}

export default CompanyApi;
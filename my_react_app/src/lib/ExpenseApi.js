import axios from 'axios';

class ExpenseApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static getCategories() {
    return axios
      .get(`${this.apiBaseUrl}/categories`)
      .then(response => ({
        expense_categories: response.data.expense_categories,
        income_categories: response.data.income_categories
      }))
  }

  static getExpenses() {
    return axios
      .get(`${this.apiBaseUrl}/expenses`)
      .then(response => ({
        expenses: response.data
      }))
  }
}

export default ExpenseApi;
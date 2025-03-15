import axios from 'axios';

class ExpenseApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000"

  static getCategories() {
    return axios
      .get(`${this.apiBaseUrl}/categories`)
      .then(response => ({
        expense_categories: response.data.expense_categories,
        income_categories: response.income_categories
      }));
  }
}

export default ExpenseApi;
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

  static createExpense(expense) {
    return axios
      .post(`${this.apiBaseUrl}/expenses`, expense)
      .then(() =>{
        alert("登録が完了しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`)
      })
  }

  static editExpense(expenseId){
    return axios
      .get(`${this.apiBaseUrl}/expenses/${expenseId}`)
      .then(response => ({
        selectExpense: response.data
      }))
      .catch(error => {
        alert("データの取得に失敗しました。")
      })
  }

  static updateExpense(expenseId, expense) {
    return axios
      .patch(`${this.apiBaseUrl}/expenses/${expenseId}`, expense)
      .then(() => {
        alert("更新が完了しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`)
      })
  }
}

export default ExpenseApi;
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

  static getExpenses(token, year, month) {
    return axios
      .get(`${this.apiBaseUrl}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          year: year,
          month: month
        }
      })
      .then(response => ({
        expenses: response.data
      }))
  }

  static createExpense(expense, token) {
    return axios
      .post(`${this.apiBaseUrl}/expenses`,
        expense, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(() =>{
        alert("登録が完了しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`)
      })
  }

  static showExpense(expenseId, token){
    return axios
      .get(`${this.apiBaseUrl}/expenses/${expenseId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then(response => ({
        editExpense: response.data["expense_log"],
        tracsactionType: response.data["transaction_type"]
      }))
      .catch(error => {
        alert("データの取得に失敗しました。")
      })
  }

  static updateExpense(expenseId, expense, token) {
    return axios
      .patch(`${this.apiBaseUrl}/expenses/${expenseId}`,
        expense, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(() => {
        alert("更新が完了しました。")
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`)
      })
  }

  static deleteExpense(expenseId, token) {
    return axios
      .delete(`${this.apiBaseUrl}/expenses/${expenseId}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      )
      .then(() => {
        alert("削除が完了しました。")
      })
      .catch(error => {
        alert("削除に失敗しました。")
      })
  }
}

export default ExpenseApi;
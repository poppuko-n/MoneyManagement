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
      .get(`${this.apiBaseUrl}/expense_logs`, {
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
      .post(`${this.apiBaseUrl}/expense_logs`,
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
      .get(`${this.apiBaseUrl}/expense_logs/${expenseId}`,{
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
      .patch(`${this.apiBaseUrl}/expense_logs/${expenseId}`,
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
      .delete(`${this.apiBaseUrl}/expense_logs/${expenseId}`,{
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

  static exportExpenses(token) {
    return axios
      .get(`${this.apiBaseUrl}/expense_logs/export`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', 
      })
      .then(response => {
        const blob = new Blob([response.data], { type: 'text/csv' }); 
        const url = window.URL.createObjectURL(blob); 
        const a = document.createElement('a');       
        a.href = url;
        a.download = `expenses_${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        window.URL.revokeObjectURL(url); 
      })
      .catch(() => {
        alert('ダウンロードに失敗しました。');
      });
  }
  
  
}

export default ExpenseApi;
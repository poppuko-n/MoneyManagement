import axios from 'axios';

class ExpenseApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000";

  static getCategories() {
    return axios
      .get(`${this.apiBaseUrl}/categories`, {
        withCredentials: true
      })
      .then(response => response.data);
  }

  static getExpenses(year, month) {
    return axios
      .get(`${this.apiBaseUrl}/expense_logs`, {
        params: { year, month },
        withCredentials: true
      })
      .then(response => ({
        expenses: response.data
      }));
  }

  static createExpense(expense) {
    return axios
      .post(`${this.apiBaseUrl}/expense_logs`, expense, {
        withCredentials: true
      })
      .then(() => {
        alert("登録が完了しました。");
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`);
      });
  }

  static showExpense(expenseId) {
    return axios
      .get(`${this.apiBaseUrl}/expense_logs/${expenseId}`, {
        withCredentials: true
      })
      .then(response => response.data)
      .catch(() => {
        alert("データの取得に失敗しました。");
      });
  }

  static updateExpense(expenseId, expense) {
    return axios
      .patch(`${this.apiBaseUrl}/expense_logs/${expenseId}`, expense, {
        withCredentials: true
      })
      .then(() => {
        alert("更新が完了しました。");
      })
      .catch(error => {
        alert(`${error.response.data.errors.join(', ')}`);
      });
  }

  static deleteExpense(expenseId) {
    return axios
      .delete(`${this.apiBaseUrl}/expense_logs/${expenseId}`, {
        withCredentials: true
      })
      .then(() => {
        alert("削除が完了しました。");
      })
      .catch(() => {
        alert("削除に失敗しました。");
      });
  }
}

export default ExpenseApi;

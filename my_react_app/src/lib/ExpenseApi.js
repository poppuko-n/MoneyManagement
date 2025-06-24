import axios from 'axios';

class ExpenseApi {
  static apiBaseUrl = window.env?.API_BASE_URL || "http://localhost:3000";

  static async getCategories() {
    const response = await axios.get(`${this.apiBaseUrl}/categories`, {withCredentials: true})
    return response.data
  }

  static async getExpenseLogs(year, month) {
    const response = await axios.get(
      `${this.apiBaseUrl}/expense_logs`,
      {
        params: { year, month },
        withCredentials: true
      }
    );
    return response.data;
  }

  static async createExpenseLog(expenseLog) {
    const response = await axios.post(
      `${this.apiBaseUrl}/expense_logs`,
      expenseLog,
      {withCredentials: true}
    );
    return response.data;
  }

  static async showExpenseLog(expenseId) {
    const response = await axios.get(
      `${this.apiBaseUrl}/expense_logs/${expenseId}`,
      { withCredentials: true}
    )
    return response.data;
  }

  static async updateExpenseLog(expenseId, expense) {
    const response = await axios.patch(
      `${this.apiBaseUrl}/expense_logs/${expenseId}`,
      expense,
      { withCredentials: true }
    );
    return response.data;
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

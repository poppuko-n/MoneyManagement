import ExpenseApi from './ExpenseApi';

class BudgetCalculator {
  static async getRecentAverageBudget(months = 3) {
    const now = new Date();
    let totalIncome = 0;
    let totalSpending = 0;

    for (let i = 0; i < months; i++) {
      const targetDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const expenses = await ExpenseApi.getExpenseLogs(targetDate.getFullYear(), targetDate.getMonth() + 1);
      
      expenses.forEach(expense => {
        if (expense.transaction_type === "収入") {
          totalIncome += expense.amount;
        } else if (expense.transaction_type === "支出") {
          totalSpending += expense.amount;
        }
      });
    }

    const income = Math.round(totalIncome / months);
    const spending = Math.round(totalSpending / months);
    const balance = income - spending;

    return {
      income,
      spending,
      balance,
      availableForInvestment: Math.max(balance, 0)
    };
  }
}

export default BudgetCalculator; 
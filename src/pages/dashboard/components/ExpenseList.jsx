// src/pages/dashboard/components/ExpenseList.jsx
import { useExpense } from "../../../context/ExpenseContext";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";

function ExpenseList() {
  const { expenses, deleteExpense } = useExpense();
  return (
    <>
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul className="expense-list">
          {expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} onDelete={deleteExpense} />
          ))}
        </ul>
      )}
    </>
  );
}

export default ExpenseList;

import Button from "../../../components/reusable/button/button";
import "./Expense.css";

function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="expense-item">
      <span>{expense.title} — ${expense.amount.toFixed(2)}</span>
      <Button variant="danger" onClick={() => onDelete(expense.id)}>Delete</Button>
    </li>
  );
}

export default ExpenseItem;

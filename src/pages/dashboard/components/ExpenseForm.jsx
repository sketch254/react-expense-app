import { useState, useRef } from "react";

import { useExpense } from "../../../context/ExpenseContext";
import Input from "../../../components/reusable/input/input";
import Button from "../../../components/reusable/button/button";

function ExpenseForm() {
  const { addExpense } = useExpense();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [errors, setErrors] = useState({});

  const titleRef = useRef(null);
  const amountRef = useRef(null);

  function validate() {
    const next = {};
    const numericAmount = Number(amount);
    if (!title.trim()) next.title = "Title is required";
    // NaN check first — NaN <= 0 is false, so non-numeric input
    // would otherwise silently pass validation.
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      next.amount = "Enter a valid amount";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleAdd(e) {
    e.preventDefault();
    if (!validate()) {
      if (!title.trim()) titleRef.current?.focus();
      else amountRef.current?.focus();
      return;
    }
    addExpense({ title: title.trim(), amount: Number(amount) });
    setTitle("");
    setAmount("");
    setErrors({});
    titleRef.current?.focus();
  }

  return (
    <>
      <h2>Add expense</h2>
      <form onSubmit={handleAdd} noValidate>
        <Input 
            ref={titleRef} 
            label="Title" 
            name="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Groceries" 
            error={errors.title} 
            required 
        />
        <Input 
            ref={amountRef} 
            label="Amount" 
            type="number" 
            name="amount" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            placeholder="0.00" 
            error={errors.amount} 
            required 
            min="0" 
            step="0.01" 
        />
        <Button type="submit" variant="primary">Add expense</Button>
      </form>
    </>
  );
}

export default ExpenseForm;

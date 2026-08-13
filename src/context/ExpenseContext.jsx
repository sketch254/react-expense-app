// src/context/ExpenseContext.jsx
import { createContext, useContext, useReducer, useEffect } from "react";

const ExpenseContext = createContext(null);
const STORAGE_KEY = "expenses";

function getInitialState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { expenses: JSON.parse(saved) };
  } catch (e) {
    console.warn("Could not load expenses from localStorage", e);
  }
  return { expenses: [] };
}

function expenseReducer(state, action) {
  switch (action.type) {
    case "SET_EXPENSES":
      return { ...state, expenses: action.payload };
    case "ADD_EXPENSE":
      return { ...state, expenses: [...state.expenses, action.payload] };
    case "UPDATE_EXPENSE":
      return { ...state, expenses: state.expenses.map((e) => (e.id === action.payload.id ? action.payload : e)) };
    case "DELETE_EXPENSE":
      return { ...state, expenses: state.expenses.filter((e) => e.id !== action.payload) };
    default:
      /* v8 ignore next -- no dispatch site sends an unknown type; defensive only */
      return state;
  }
}

export function ExpenseProvider({ children }) {
  const [state, dispatch] = useReducer(expenseReducer, undefined, getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.expenses));
  }, [state.expenses]);

  function addExpense(expense) {
    dispatch({ type: "ADD_EXPENSE", payload: { ...expense, id: Date.now() } });
  }
  function updateExpense(expense) {
    dispatch({ type: "UPDATE_EXPENSE", payload: expense });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  }
  function setExpenses(list) {
    dispatch({ type: "SET_EXPENSES", payload: list });
  }

  const value = { expenses: state.expenses, addExpense, updateExpense, deleteExpense, setExpenses };
  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpense() {
  const context = useContext(ExpenseContext);
  if (!context) throw new Error("useExpense must be used inside ExpenseProvider");
  return context;
}

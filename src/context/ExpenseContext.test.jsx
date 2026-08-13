import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ExpenseProvider, useExpense } from "./ExpenseContext";

function Probe() {
  const { 
    expenses, 
    addExpense, 
    updateExpense, 
    deleteExpense, 
    setExpenses 
    } = useExpense();
  return (
    <div>
      <ul>{expenses.map((e) => <li key={e.id}>{`${e.title}:${e.amount}`}</li>)}</ul>
      <button onClick={() => addExpense({ title: "Coffee", amount: 4 })}>add</button>
      <button onClick={() => expenses[0] && updateExpense({ ...expenses[0], amount: 99 })}>update</button>
      <button onClick={() => expenses[0] && deleteExpense(expenses[0].id)}>delete</button>
      <button onClick={() => setExpenses([{ id: 1, title: "Bulk", amount: 1 }])}>bulk</button>
    </div>
  );
}

function renderProbe() {
  return render(<ExpenseProvider><Probe /></ExpenseProvider>);
}

test("starts empty when nothing in localStorage", () => {
  renderProbe();
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
});

test("addExpense assigns an id, appends, persists", async () => {
  const user = userEvent.setup();
  renderProbe();
  await user.click(screen.getByText("add"));
  expect(screen.getByText("Coffee:4")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("expenses"))).toHaveLength(1);
});

test("updateExpense replaces the matching entry", async () => {
  const user = userEvent.setup();
  renderProbe();
  await user.click(screen.getByText("add"));
  await user.click(screen.getByText("update"));
  expect(screen.getByText("Coffee:99")).toBeInTheDocument();
});

test("deleteExpense removes the matching entry", async () => {
  const user = userEvent.setup();
  renderProbe();
  await user.click(screen.getByText("add"));
  await user.click(screen.getByText("delete"));
  expect(screen.queryByText(/Coffee/)).not.toBeInTheDocument();
});

test("setExpenses replaces the whole list", async () => {
  const user = userEvent.setup();
  renderProbe();
  await user.click(screen.getByText("bulk"));
  expect(screen.getByText("Bulk:1")).toBeInTheDocument();
});

test("corrupt localStorage falls back to empty state", () => {
  localStorage.setItem("expenses", "{not valid json");
  const spy = vi.spyOn(console, "warn").mockImplementation(() => {});
  renderProbe();
  expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  spy.mockRestore();
});

test("useExpense throws outside ExpenseProvider", () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow("useExpense must be used inside ExpenseProvider");
  spy.mockRestore();
});

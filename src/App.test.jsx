import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ExpenseProvider } from "./context/ExpenseContext";
import App from "./App";

function renderApp(initialPath) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <AuthProvider><ExpenseProvider><App /></ExpenseProvider></AuthProvider>
    </MemoryRouter>
  );
}

test("unauthenticated visitor is redirected to the auth page", async () => {
  renderApp("/");
  expect(await screen.findByText("Login")).toBeInTheDocument();
});

test("authenticated visitor sees the dashboard", async () => {
  localStorage.setItem("user", JSON.stringify({ id: 1, name: "Ada", email: "a@a.com" }));
  renderApp("/");
  expect(await screen.findByText("Hello, Ada")).toBeInTheDocument();
});

// test("unknown path redirects home, then to login if logged out", async () => {
//   renderApp("/nonsense");
//   expect(await screen.findByText("Login")).toBeInTheDocument();
// });

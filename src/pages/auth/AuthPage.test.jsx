import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../../context/AuthContext";
import AuthPage from "./AuthPage";

function renderPage() {
  return render(<MemoryRouter><AuthProvider><AuthPage /></AuthProvider></MemoryRouter>);
}

test("signing up prefills the Login form with the same name and email", async () => {
  const user = userEvent.setup();
  renderPage();
  await user.type(screen.getAllByLabelText(/Name/)[1], "Ada");
  await user.type(screen.getAllByLabelText(/Email/)[1], "ada@x.com");
  await user.type(screen.getAllByLabelText(/Password/)[0], "hunter2");
  await user.click(screen.getByRole("button", { name: "Sign up" }));
  expect(screen.getAllByLabelText(/Name/)[0]).toHaveValue("Ada");
  expect(screen.getAllByLabelText(/Email/)[0]).toHaveValue("ada@x.com");
});
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { useAuth } from "../../context/AuthContext";

const navigateMock = vi.fn();
vi.mock("../../context/AuthContext", () => ({ useAuth: vi.fn() }));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

beforeEach(() => navigateMock.mockClear());

test("submitting calls login with entered values and navigates home", async () => {
  const loginMock = vi.fn();
  useAuth.mockReturnValue({ login: loginMock, isAuthenticated: false });
  const user = userEvent.setup();
  render(<Login />);
  await user.type(screen.getByLabelText("Name"), "Ada");
  await user.type(screen.getByLabelText("Email"), "ada@x.com");
  await user.click(screen.getByText("Log in"));
  expect(loginMock).toHaveBeenCalledWith({ id: 1, name: "Ada", email: "ada@x.com" });
  expect(navigateMock).toHaveBeenCalledWith("/");
});

test("blank fields fall back to defaults", async () => {
  const loginMock = vi.fn();
  useAuth.mockReturnValue({ login: loginMock, isAuthenticated: false });
  const user = userEvent.setup();
  render(<Login />);
  await user.click(screen.getByText("Log in"));
  expect(loginMock).toHaveBeenCalledWith({ id: 1, name: "User", email: "user@example.com" });
});

test("already authenticated renders nothing and redirects", () => {
  useAuth.mockReturnValue({ login: vi.fn(), isAuthenticated: true });
  render(<Login />);
  expect(screen.queryByText("Login")).not.toBeInTheDocument();
  expect(navigateMock).toHaveBeenCalledWith("/");
});

test("prefill props populate fields after mount", () => {
  useAuth.mockReturnValue({ login: vi.fn(), isAuthenticated: false });
  render(<Login prefillName="Grace" prefillEmail="g@g.com" />);
  expect(screen.getByLabelText("Name")).toHaveValue("Grace");
  expect(screen.getByLabelText("Email")).toHaveValue("g@g.com");
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Signup from "./Signup";
import { useAuth } from "../../context/AuthContext";

const navigateMock = vi.fn();
vi.mock("../../context/AuthContext", () => ({ useAuth: vi.fn() }));
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => navigateMock };
});

beforeEach(() => navigateMock.mockClear());

test("submitting hands name/email up, clears fields, shows confirmation", async () => {
  useAuth.mockReturnValue({ isAuthenticated: false });
  const onSignupComplete = vi.fn();
  const user = userEvent.setup();
  render(<Signup onSignupComplete={onSignupComplete} />);
  await user.type(screen.getByLabelText(/Name/), "Ada");
  await user.type(screen.getByLabelText(/Email/), "ada@x.com");
  await user.type(screen.getByLabelText(/Password/), "hunter2");
  await user.click(screen.getByRole("button", { name: "Sign up" }));
  expect(onSignupComplete).toHaveBeenCalledWith("Ada", "ada@x.com");
  expect(screen.getByLabelText(/Name/)).toHaveValue("");
  expect(screen.getByRole("status")).toBeInTheDocument();
});

test("does not create a session", async () => {
  useAuth.mockReturnValue({ isAuthenticated: false });
  const user = userEvent.setup();
  render(<Signup onSignupComplete={vi.fn()} />);
  await user.click(screen.getByRole("button", { name: "Sign up" }));
  expect(navigateMock).not.toHaveBeenCalled();
});

test("already authenticated redirects away", () => {
  useAuth.mockReturnValue({ isAuthenticated: true });
  render(<Signup onSignupComplete={vi.fn()} />);
  expect(navigateMock).toHaveBeenCalledWith("/");
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AuthProvider, useAuth } from "./AuthContext";

function Probe() {
  const { user, loading, isAuthenticated, login, logout } = useAuth();
  if (loading) return <p>loading</p>;
  return (
    <div>
      <p>{isAuthenticated ? `in:${user.name}` : "out"}</p>
      <button onClick={() => login({ id: 1, name: "Ada", email: "a@a.com" })}>login</button>
      <button onClick={logout}>logout</button>
    </div>
  );
}

function renderProbe() {
  return render(<AuthProvider><Probe /></AuthProvider>);
}

test("login sets user, persists to localStorage, flips isAuthenticated", async () => {
  const user = userEvent.setup();
  renderProbe();
  await waitFor(() => screen.getByText("out"));
  await user.click(screen.getByText("login"));

  expect(screen.getByText("in:Ada")).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("user"))).toEqual({ id: 1, name: "Ada", email: "a@a.com" });
});

test("logout clears user and localStorage", async () => {
  const user = userEvent.setup();
  renderProbe();
  await waitFor(() => screen.getByText("out"));
  await user.click(screen.getByText("login"));
  await user.click(screen.getByText("logout"));
  expect(localStorage.getItem("user")).toBeNull();
});

test("restores session from localStorage on mount", async () => {
  localStorage.setItem("user", JSON.stringify({ id: 2, name: "Grace", email: "g@g.com" }));
  renderProbe();
  await waitFor(() => expect(screen.getByText("in:Grace")).toBeInTheDocument());
});

// test("useAuth throws outside AuthProvider", () => {
//   const spy = vi.spyOn(console, "error").mockImplementation(() => {});
//   expect(() => render(<Probe />)).toThrow("useAuth must be used inside AuthProvider");
//   spy.mockRestore();
// });


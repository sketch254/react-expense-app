import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { createRef } from "react";
import Button from "./button";

test("renders children and fires onClick", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Save</Button>);
  await user.click(screen.getByText("Save"));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test("disabled button does not fire onClick", async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  render(<Button onClick={handleClick} disabled>Save</Button>);
  await user.click(screen.getByText("Save"));
  expect(handleClick).not.toHaveBeenCalled();
});

test("forwards ref to the native button element", () => {
  const ref = createRef();
  render(<Button ref={ref}>X</Button>);
  expect(ref.current).toBeInstanceOf(HTMLButtonElement);
});

test("unknown variant falls back to primary", () => {
  render(<Button variant="not-real">X</Button>);
  expect(screen.getByText("X")).toHaveClass("btn--primary");
});

test("defaults to type=button", () => {
  render(<Button>X</Button>);
  expect(screen.getByText("X")).toHaveAttribute("type", "button");
});

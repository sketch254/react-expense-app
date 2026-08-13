import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import Input from "./input";

test("label is associated with the input via htmlFor/id", () => {
  render(<Input label="Email" value="" onChange={() => {}} />);
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
});

test("calls onChange when typed into", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();
  render(<Input label="Name" value="" onChange={handleChange} />);
  await user.type(screen.getByLabelText("Name"), "a");
  expect(handleChange).toHaveBeenCalled();
});

test("forwards ref to the native input element", () => {
  const ref = createRef();
  render(<Input label="X" value="" onChange={() => {}} ref={ref} />);
  expect(ref.current).toBeInstanceOf(HTMLInputElement);
});

test("shows error and marks aria-invalid", () => {
  render(<Input label="Amount" value="" onChange={() => {}} error="Enter a valid amount" />);
  expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid amount");
  expect(screen.getByLabelText("Amount")).toHaveAttribute("aria-invalid", "true");
});

test("required sets the required attribute", () => {
  render(<Input label="Title" value="" onChange={() => {}} required />);
  expect(screen.getByLabelText(/Title/)).toBeRequired();
});

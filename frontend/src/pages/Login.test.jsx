import { render, screen } from "@testing-library/react";
import Login from "./Login";

describe("Login Page", () => {
  test("renders email input", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  test("renders password input", () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  test("renders login button", () => {
    render(<Login />);
    expect(
      screen.getByRole("button", { name: /login/i })
    ).toBeInTheDocument();
  });
});
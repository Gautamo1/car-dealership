import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("allows typing email", async () => {
    const user = userEvent.setup();

    render(<Login />);

    const email = screen.getByPlaceholderText(/email/i);

    await user.type(email, "admin@test.com");

    expect(email).toHaveValue("admin@test.com");
  });

  test("allows typing password", async () => {
    const user = userEvent.setup();

    render(<Login />);

    const password = screen.getByPlaceholderText(/password/i);

    await user.type(password, "password123");

    expect(password).toHaveValue("password123");
  });
});
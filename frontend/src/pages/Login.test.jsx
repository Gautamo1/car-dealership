import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import Login from "./Login";

const mockLogin = vi.fn();

vi.mock("../api/auth", () => ({
  login: (...args) => mockLogin(...args),
}));
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

  test("submits login credentials", async () => {
    mockLogin.mockResolvedValue({});

    const user = userEvent.setup();

    render(<Login />);

    await user.type(
      screen.getByPlaceholderText(/email/i),
      "admin@test.com"
    );

    await user.type(
      screen.getByPlaceholderText(/password/i),
      "password123"
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(mockLogin).toHaveBeenCalledWith({
      email: "admin@test.com",
      password: "password123",
    });
  });
});

test("redirects to dashboard after successful login", async () => {
  mockLogin.mockResolvedValue({
    access_token: "fake-jwt",
  });

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  await user.type(
    screen.getByPlaceholderText(/email/i),
    "admin@test.com"
  );

  await user.type(
    screen.getByPlaceholderText(/password/i),
    "password123"
  );

  await user.click(
    screen.getByRole("button", {
      name: /login/i,
    })
  );

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});
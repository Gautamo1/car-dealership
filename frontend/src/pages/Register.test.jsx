import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import { registerUser } from "../api/auth";

vi.mock("../api/auth", () => ({
  registerUser: vi.fn(),
}));

describe("Register", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("submits registration details", async () => {
    registerUser.mockResolvedValue({});

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );

    await user.type(screen.getByLabelText(/username/i), "john");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/password/i), "secret123");

    await user.click(
      screen.getByRole("button", {
        name: /register/i,
      })
    );

    expect(registerUser).toHaveBeenCalledWith({
      username: "john",
      email: "john@example.com",
      password: "secret123",
      role: "customer",
    });
  });
});
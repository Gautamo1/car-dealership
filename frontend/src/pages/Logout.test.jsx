import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import Dashboard from "./Dashboard";

const { mockNavigate } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const { mockGetVehicles } = vi.hoisted(() => ({
  mockGetVehicles: vi.fn(),
}));

vi.mock("../api/vehicle", () => ({
  getVehicles: mockGetVehicles,
}));


test("logs out the user", async () => {
  localStorage.setItem("token", "jwt-token");

  const user = userEvent.setup();

mockGetVehicles.mockResolvedValue([]);

  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  await user.click(screen.getByRole("button", { name: /logout/i }));

  expect(localStorage.getItem("token")).toBeNull();
  expect(mockNavigate).toHaveBeenCalledWith("/");
});
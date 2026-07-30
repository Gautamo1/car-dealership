import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Dashboard from "./Dashboard";
import jwtEncode from "jwt-encode";

function createToken(role) {
  return jwtEncode(
    {
      sub: "1",
      role,
    },
    "secret"
  );
}

const { mockGetVehicles } = vi.hoisted(() => ({
  mockGetVehicles: vi.fn(),
}));

vi.mock("../api/vehicle", () => ({
  getVehicles: mockGetVehicles,
}));

describe("RBAC", () => {
  beforeEach(() => {
    mockGetVehicles.mockResolvedValue([
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "Sedan",
        price: 30000,
      },
    ]);

    localStorage.clear();
  });

  test("admin sees Create Vehicle button", async () => {
    localStorage.setItem("token", createToken("admin"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", {
        name: /create vehicle/i,
      })
    ).toBeInTheDocument();
  });

  test("customer does not see Create Vehicle button", async () => {
    localStorage.setItem("token", createToken("customer"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", {
        name: /create vehicle/i,
      })
    ).not.toBeInTheDocument();
  });

  test("admin sees Delete button", async () => {
    localStorage.setItem("token", createToken("admin"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", {
        name: /delete/i,
      })
    ).toBeInTheDocument();
  });

  test("customer does not see Delete button", async () => {
    localStorage.setItem("token", createToken("customer"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", {
        name: /delete/i,
      })
    ).not.toBeInTheDocument();
  });

  test("admin does not see Purchase button", async () => {
    localStorage.setItem("token", createToken("admin"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      screen.queryByRole("button", {
        name: /purchase/i,
      })
    ).not.toBeInTheDocument();
  });

  test("customer sees Purchase button", async () => {
    localStorage.setItem("token", createToken("customer"));

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", {
        name: /purchase/i,
      })
    ).toBeInTheDocument();
  });
});
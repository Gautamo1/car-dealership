import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import VehicleList from "./VehicleList";

const {
  mockGetVehicles,
  mockDeleteVehicle,
  mockPurchaseVehicle,
  mockRestockVehicle,
  mockNavigate,
} = vi.hoisted(() => ({
  mockGetVehicles: vi.fn(),
  mockDeleteVehicle: vi.fn(),
  mockPurchaseVehicle: vi.fn(),
  mockRestockVehicle: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock("../api/vehicle", () => ({
  getVehicles: mockGetVehicles,
  deleteVehicle: mockDeleteVehicle,
}));

vi.mock("../api/inventory", () => ({
  purchaseVehicle: mockPurchaseVehicle,
  restockVehicle: mockRestockVehicle,
}));

vi.mock("../utils/auth", () => ({
  isAdmin: () => true,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Restock", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("admin sees Restock button", async () => {
    mockGetVehicles.mockResolvedValue([
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "Sedan",
        price: 30000,
        stock: 5,
      },
    ]);

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("button", {
        name: /restock/i,
      })
    ).toBeInTheDocument();
  });
});
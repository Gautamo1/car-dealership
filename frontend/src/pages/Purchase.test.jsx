import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import VehicleList from "./VehicleList";

const {
  mockGetVehicles,
  mockDeleteVehicle,
  mockPurchaseVehicle,
  mockNavigate,
} = vi.hoisted(() => ({
  mockGetVehicles: vi.fn(),
  mockDeleteVehicle: vi.fn(),
  mockPurchaseVehicle: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock("../api/vehicle", () => ({
  getVehicles: mockGetVehicles,
  deleteVehicle: mockDeleteVehicle,
}));

vi.mock("../api/inventory", () => ({
  purchaseVehicle: mockPurchaseVehicle,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Purchase", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("clicking Purchase purchases a vehicle", async () => {
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

    mockPurchaseVehicle.mockResolvedValue({});

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    const button = await screen.findByRole("button", {
      name: /purchase/i,
    });

    await user.click(button);

    expect(mockPurchaseVehicle).toHaveBeenCalledWith(1);
  });
});

test("purchase button is disabled when stock is zero", async () => {
  mockGetVehicles.mockResolvedValue([
    {
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2024,
      category: "Sedan",
      price: 30000,
      stock: 0,
    },
  ]);

  render(
    <MemoryRouter>
      <VehicleList />
    </MemoryRouter>
  );

  const button = await screen.findByRole("button", {
    name: /purchase/i,
  });

  expect(button).toBeDisabled();
});

test("reloads vehicles after purchase", async () => {
  mockGetVehicles
    .mockResolvedValueOnce([
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "Sedan",
        price: 30000,
        stock: 5,
      },
    ])
    .mockResolvedValueOnce([]);

  mockPurchaseVehicle.mockResolvedValue({});

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <VehicleList />
    </MemoryRouter>
  );

  const button = await screen.findByRole("button", {
    name: /purchase/i,
  });

  await user.click(button);

  expect(mockPurchaseVehicle).toHaveBeenCalledWith(1);
  expect(mockGetVehicles.mock.calls.length).toBeGreaterThanOrEqual(2);
});
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import VehicleList from "./VehicleList";

const {
  mockGetVehicles,
  mockDeleteVehicle,
  mockNavigate,
} = vi.hoisted(() => ({
  mockGetVehicles: vi.fn(),
  mockDeleteVehicle: vi.fn(),
  mockNavigate: vi.fn(),
}));

vi.mock("../api/vehicle", () => ({
  getVehicles: mockGetVehicles,
  deleteVehicle: mockDeleteVehicle,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("VehicleList", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders vehicles returned by the API", async () => {
    mockGetVehicles.mockResolvedValue([
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "Sedan",
        price: 30000,
      },
      {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2023,
        category: "Sedan",
        price: 28000,
      },
    ]);

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    expect(await screen.findByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Honda")).toBeInTheDocument();
  });

  test("filters vehicles when searching", async () => {
    mockGetVehicles.mockResolvedValue([
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2024,
        category: "Sedan",
        price: 30000,
      },
      {
        id: 2,
        make: "Honda",
        model: "Civic",
        year: 2023,
        category: "Sedan",
        price: 28000,
      },
    ]);

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    await screen.findByText("Toyota");

    await user.type(
      screen.getByPlaceholderText(/search/i),
      "Toyota"
    );

    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(
      screen.queryByText("Honda")
    ).not.toBeInTheDocument();
  });

  test("navigates to vehicle details when clicked", async () => {
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

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    const vehicle = await screen.findByText("Toyota");

    await user.click(vehicle);

    expect(mockNavigate).toHaveBeenCalledWith("/vehicles/1");
  });

  test("deletes a vehicle", async () => {
    mockGetVehicles
      .mockResolvedValueOnce([
        {
          id: 1,
          make: "Toyota",
          model: "Camry",
          year: 2024,
          category: "Sedan",
          price: 30000,
        },
      ])
      .mockResolvedValueOnce([]);

    mockDeleteVehicle.mockResolvedValue({});

    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <VehicleList />
      </MemoryRouter>
    );

    const deleteButton = await screen.findByRole("button", {
      name: /delete/i,
    });

    await user.click(deleteButton);

    expect(mockDeleteVehicle).toHaveBeenCalledTimes(1);
    expect(mockDeleteVehicle).toHaveBeenCalledWith(1);
  });
});
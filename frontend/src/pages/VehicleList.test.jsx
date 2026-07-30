import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import VehicleList from "./VehicleList";

const mockGetVehicles = vi.fn();

vi.mock("../api/vehicle", () => ({
  getVehicles: (...args) => mockGetVehicles(...args),
}));

describe("Vehicle List", () => {
  beforeEach(() => {
    mockGetVehicles.mockReset();
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

    render(<VehicleList />);

    expect(await screen.findByText("Toyota")).toBeInTheDocument();
    expect(await screen.findByText("Honda")).toBeInTheDocument();
  });
});
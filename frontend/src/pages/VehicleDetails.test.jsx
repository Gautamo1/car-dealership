import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi } from "vitest";
import VehicleDetails from "./VehicleDetails";

const mockGetVehicle = vi.fn();

vi.mock("../api/vehicle", () => ({
  getVehicle: (...args) => mockGetVehicle(...args),
}));

describe("Vehicle Details", () => {
  beforeEach(() => {
    mockGetVehicle.mockReset();
  });

  test("renders the selected vehicle", async () => {
    mockGetVehicle.mockResolvedValue({
      id: 1,
      make: "Toyota",
      model: "Camry",
      year: 2024,
      category: "Sedan",
      price: 30000,
      stock: 5,
    });

    render(
      <MemoryRouter initialEntries={["/vehicles/1"]}>
        <Routes>
          <Route
            path="/vehicles/:id"
            element={<VehicleDetails />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Camry")).toBeInTheDocument();
    expect(screen.getByText("2024")).toBeInTheDocument();
    expect(screen.getByText("Sedan")).toBeInTheDocument();
    expect(screen.getByText("$30,000")).toBeInTheDocument();
  });
});
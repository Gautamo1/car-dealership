import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import VehicleForm from "./VehicleForm";

const mockCreateVehicle = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../api/vehicle", () => ({
  createVehicle: (...args) => mockCreateVehicle(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

test("submits a new vehicle", async () => {
  mockCreateVehicle.mockResolvedValue({});

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <VehicleForm />
    </MemoryRouter>
  );

  await user.type(screen.getByLabelText(/make/i), "Toyota");
  await user.type(screen.getByLabelText(/model/i), "Camry");
  await user.type(screen.getByLabelText(/year/i), "2024");
  await user.type(screen.getByLabelText(/category/i), "Sedan");
  await user.type(screen.getByLabelText(/price/i), "30000");

  await user.click(
    screen.getByRole("button", {
      name: /save vehicle/i,
    })
  );

  expect(mockCreateVehicle).toHaveBeenCalledWith({
    make: "Toyota",
    model: "Camry",
    year: 2024,
    category: "Sedan",
    price: 30000,
    stock: 0,
  });

  expect(mockNavigate).toHaveBeenCalledWith(
    "/dashboard",
    {
      state: { successMessage: "Vehicle created successfully" },
    }
  );
});
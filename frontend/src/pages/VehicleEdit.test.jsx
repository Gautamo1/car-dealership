import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import VehicleEdit from "./VehicleEdit";

const mockGetVehicle = vi.fn();
const mockUpdateVehicle = vi.fn();
const mockNavigate = vi.fn();

vi.mock("../api/vehicle", () => ({
  getVehicle: (...args) => mockGetVehicle(...args),
  updateVehicle: (...args) => mockUpdateVehicle(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: "1" }),
  };
});

test("updates an existing vehicle", async () => {
  mockGetVehicle.mockResolvedValue({
    id: 1,
    make: "Toyota",
    model: "Camry",
    year: "2024",
    category: "Sedan",
    price: "30000",
  });

  mockUpdateVehicle.mockResolvedValue({});

  const user = userEvent.setup();

  render(
    <MemoryRouter>
      <VehicleEdit />
    </MemoryRouter>
  );

  const model = await screen.findByDisplayValue("Camry");

  await user.clear(model);
  await user.type(model, "Corolla");

  await user.click(
    screen.getByRole("button", {
      name: /save vehicle/i,
    })
  );

  expect(mockUpdateVehicle).toHaveBeenCalled();

  expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
});
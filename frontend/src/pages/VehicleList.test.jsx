import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import VehicleList from "./VehicleList";
import { MemoryRouter } from "react-router-dom";
import VehicleForm from "./VehicleForm";

const mockGetVehicles = vi.fn();

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

test("navigates to vehicle details when a vehicle is clicked", async () => {
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

  render(<VehicleList />);

  expect(await screen.findByText("Toyota")).toBeInTheDocument();
  expect(screen.getByText("Honda")).toBeInTheDocument();

  await user.type(
    screen.getByPlaceholderText(/search/i),
    "Toyota"
  );

  expect(screen.getByText("Toyota")).toBeInTheDocument();
  expect(screen.queryByText("Honda")).not.toBeInTheDocument();
});

test("displays complete vehicle information", async () => {
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

  render(<VehicleList />);

  expect(await screen.findByText("Toyota")).toBeInTheDocument();
  expect(screen.getByText("Camry")).toBeInTheDocument();
  expect(screen.getByText("2024")).toBeInTheDocument();
  expect(screen.getByText("Sedan")).toBeInTheDocument();
  expect(screen.getByText("$30,000")).toBeInTheDocument();
});

describe("Vehicle Form", () => {
  test("renders all vehicle fields", () => {
    render(<VehicleForm />);

    expect(screen.getByLabelText(/make/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/price/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /save vehicle/i,
      })
    ).toBeInTheDocument();
  });
});
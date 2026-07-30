import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../api/vehicle";

export default function VehicleForm() {
  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    price: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
  e.preventDefault();

  await createVehicle(form);

  navigate("/dashboard");
}

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <h1>Add Vehicle</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="make">Make</label>
          <input
            id="make"
            name="make"
            value={form.make}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="model">Model</label>
          <input
            id="model"
            name="model"
            value={form.model}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <input
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Save Vehicle
        </button>
      </form>
    </div>
  );
}
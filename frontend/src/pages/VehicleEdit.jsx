import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getVehicle,
  updateVehicle,
} from "../api/vehicle";

export default function VehicleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    price: "",
  });

  useEffect(() => {
    async function loadVehicle() {
      const vehicle = await getVehicle(id);
      setForm(vehicle);
    }

    loadVehicle();
  }, [id]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await updateVehicle(id, form);

    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Edit Vehicle</h1>

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
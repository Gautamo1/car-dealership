import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../api/vehicle";
import VehicleFormComponent from "../components/VehicleForm";

export default function VehicleForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    price: "",
    stock: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  
    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      stock: Number(form.stock),
    };
  
    console.log(payload);
  
    await createVehicle(payload);
  
    navigate("/dashboard");
  }

  return (
    <div>
      <h1>Add Vehicle</h1>

    <VehicleFormComponent
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      buttonText="Save Vehicle"
    />
    </div>
  );
}
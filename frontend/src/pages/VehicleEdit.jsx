import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
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
      <VehicleForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Save Vehicle"
      />
    </div>
  );
}
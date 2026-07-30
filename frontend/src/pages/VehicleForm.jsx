import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVehicle } from "../api/vehicle";
import VehicleFormComponent from "../components/VehicleForm";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/error";

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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
  
    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      stock: form.stock === "" ? 0 : Number(form.stock),
    };

    try {
      await createVehicle(payload);

      navigate("/dashboard", {
        state: { successMessage: "Vehicle created successfully" },
      });
    } catch (error) {
      setError(getErrorMessage(error, "Unable to create vehicle."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Add Vehicle</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add a new vehicle to the inventory.
        </p>
      </div>

      {error ? (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      ) : null}

      <VehicleFormComponent
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Save Vehicle"
        isSubmitting={isSubmitting}
        submitLoadingText="Saving vehicle..."
      />
    </div>
  );
}
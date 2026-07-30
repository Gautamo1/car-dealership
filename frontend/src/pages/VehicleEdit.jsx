import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import VehicleForm from "../components/VehicleForm";
import {
  getVehicle,
  updateVehicle,
} from "../api/vehicle";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/error";

export default function VehicleEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    make: "",
    model: "",
    year: "",
    category: "",
    price: "",
    stock: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadVehicle() {
      try {
        const vehicle = await getVehicle(id);

        setForm({
          make: vehicle.make ?? "",
          model: vehicle.model ?? "",
          year: vehicle.year ?? "",
          category: vehicle.category ?? "",
          price: vehicle.price ?? "",
          stock: vehicle.stock ?? "",
        });
      } catch (error) {
        setError(getErrorMessage(error, "Unable to load vehicle details."));
      } finally {
        setIsLoading(false);
      }
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
    setError("");
    setIsSubmitting(true);

    const payload = {
      ...form,
      year: Number(form.year),
      price: Number(form.price),
      stock: form.stock === "" ? 0 : Number(form.stock),
    };

    try {
      await updateVehicle(id, payload);

      navigate("/dashboard", {
        state: { successMessage: "Vehicle updated successfully" },
      });
    } catch (error) {
      setError(getErrorMessage(error, "Unable to update vehicle."));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-3xl items-center justify-center px-4 py-12 text-slate-600">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
          Loading vehicle...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Edit Vehicle</h1>
        <p className="mt-2 text-sm text-slate-600">
          Update the inventory details below.
        </p>
      </div>

      {error ? (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      ) : null}

      <VehicleForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        buttonText="Save Vehicle"
        isSubmitting={isSubmitting}
        submitLoadingText="Updating vehicle..."
      />
    </div>
  );
}
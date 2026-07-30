import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getVehicle } from "../api/vehicle";
import Alert from "../components/Alert";
import { isAdmin } from "../utils/auth";
import { getErrorMessage } from "../utils/error";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadVehicle() {
      try {
        const data = await getVehicle(id);
        setVehicle(data);
      } catch (error) {
        setError(getErrorMessage(error, "Unable to load vehicle details."));
      } finally {
        setIsLoading(false);
      }
    }

    loadVehicle();
  }, [id]);

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

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Alert type="error">{error}</Alert>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <Alert type="info">Vehicle not found.</Alert>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
              Vehicle Details
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              {vehicle.make}
            </h1>
            <p className="mt-1 text-lg text-slate-600">{vehicle.model}</p>
          </div>

          {isAdmin() ? (
            <Link
              to={`/vehicles/${vehicle.id}/edit`}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Edit Vehicle
            </Link>
          ) : null}
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Year</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">{vehicle.year}</dd>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Category</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">{vehicle.category}</dd>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Price</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">
              ${Number(vehicle.price).toLocaleString()}
            </dd>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-sm text-slate-500">Stock</dt>
            <dd className="mt-1 text-lg font-semibold text-slate-900">{vehicle.stock}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
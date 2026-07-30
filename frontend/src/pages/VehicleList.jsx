import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import {
  getVehicles,
  deleteVehicle,
} from "../api/vehicle";
import { purchaseVehicle,
        restockVehicle,
 } from "../api/inventory";
import Alert from "../components/Alert";
import { getErrorMessage } from "../utils/error";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  async function loadVehicles() {
    setIsLoading(true);

    try {
      const data = await getVehicles();
      setVehicles(data);
      setError("");
    } catch (error) {
      setError(getErrorMessage(error, "Unable to load vehicles."));
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this vehicle? This action cannot be undone.");

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccessMessage("");
    setPendingAction({ type: "delete", id });

    try {
      await deleteVehicle(id);
      setSuccessMessage("Vehicle deleted successfully");
      await loadVehicles();
    } catch (error) {
      setError(getErrorMessage(error, "Unable to delete vehicle."));
    } finally {
      setPendingAction(null);
    }
  }

  async function handlePurchase(id) {
    const confirmed = window.confirm("Confirm purchase for this vehicle?");

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccessMessage("");
    setPendingAction({ type: "purchase", id });

    try {
      await purchaseVehicle(id);
      setSuccessMessage("Purchase successful");
      await loadVehicles();
    } catch (error) {
      setError(getErrorMessage(error, "Unable to complete purchase."));
    } finally {
      setPendingAction(null);
    }
  }
  async function handleRestock(id) {
    const quantity = Number(window.prompt("Enter quantity to add"));
  
    if (!quantity || quantity <= 0) return;

    const confirmed = window.confirm(`Restock this vehicle with ${quantity} units?`);

    if (!confirmed) {
      return;
    }

    setError("");
    setSuccessMessage("");
    setPendingAction({ type: "restock", id });

    try {
      await restockVehicle(id, quantity);
      setSuccessMessage("Vehicle restocked successfully");
      await loadVehicles();
    } catch (error) {
      setError(getErrorMessage(error, "Unable to restock vehicle."));
    } finally {
      setPendingAction(null);
    }
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = search.toLowerCase();

    return (
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.category.toLowerCase().includes(query)
    );
  });

  const isActionPending = (type, id) =>
    pendingAction?.type === type && pendingAction?.id === id;

  const showEmptyState = !isLoading && filteredVehicles.length === 0;
  const emptyStateMessage =
    search.trim().length > 0
      ? "No matching vehicles found."
      : "No vehicles available.";

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Vehicles</h1>
          <p className="mt-1 text-sm text-slate-600">
            Search, purchase, restock, and manage inventory.
          </p>
        </div>

        <div className="w-full md:max-w-sm">
          <label htmlFor="vehicle-search" className="sr-only">
            Search vehicles
          </label>

          <input
            id="vehicle-search"
            type="text"
            placeholder="Search vehicles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {error ? (
        <Alert type="error" className="mb-4">
          {error}
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert type="success" className="mb-4">
          {successMessage}
        </Alert>
      ) : null}

      {isLoading ? (
        <div className="flex items-center justify-center rounded-3xl border border-slate-200 bg-white px-6 py-12 text-slate-600 shadow-lg shadow-slate-200/60">
          <div className="flex items-center gap-3">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
            Loading vehicles...
          </div>
        </div>
      ) : showEmptyState ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-slate-600 shadow-sm">
          {emptyStateMessage}
        </div>
      ) : (
        <ul className="grid gap-5 lg:grid-cols-2">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onDelete={handleDelete}
              onPurchase={handlePurchase}
              onRestock={handleRestock}
              isDeleting={isActionPending("delete", vehicle.id)}
              isPurchasing={isActionPending("purchase", vehicle.id)}
              isRestocking={isActionPending("restock", vehicle.id)}
            />
          ))}
        </ul>
      )}

    </div>
  );
}
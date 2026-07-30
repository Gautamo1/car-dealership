import { useNavigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function VehicleCard({
  vehicle,
  onDelete,
  onPurchase,
  onRestock,
  isDeleting = false,
  isPurchasing = false,
  isRestocking = false,
}) {
  const navigate = useNavigate();
  const admin = isAdmin();

  return (
    <li className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <button
            type="button"
            className="text-left text-xl font-semibold text-slate-900 transition hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={() => navigate(`/vehicles/${vehicle.id}`)}
          >
            {vehicle.make}
          </button>

          <p className="text-sm text-slate-600">{vehicle.model}</p>
          <div className="flex flex-wrap gap-2 text-sm text-slate-500">
            <span>{vehicle.year}</span>
            <span>•</span>
            <span>{vehicle.category}</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">
            ${Number(vehicle.price).toLocaleString()}
          </p>
          <p className="text-sm text-slate-500">Stock: {vehicle.stock}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {admin ? (
          <button
            type="button"
            onClick={() => navigate(`/vehicles/${vehicle.id}/edit`)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Edit
          </button>
        ) : null}

        {!admin ? (
          <button
            type="button"
            onClick={() => onPurchase(vehicle.id)}
            disabled={vehicle.stock === 0 || isPurchasing}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-600/20 transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-emerald-400"
          >
            {isPurchasing ? "Purchasing..." : "Purchase"}
          </button>
        ) : null}

        {admin ? (
          <button
            type="button"
            onClick={() => onRestock(vehicle.id)}
            disabled={isRestocking}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm shadow-amber-500/20 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:bg-amber-300"
          >
            {isRestocking ? "Restocking..." : "Restock"}
          </button>
        ) : null}

        {admin ? (
          <button
            type="button"
            onClick={() => onDelete(vehicle.id)}
            disabled={isDeleting}
            className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-rose-600/20 transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 disabled:bg-rose-400"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        ) : null}
      </div>
    </li>
  );
}
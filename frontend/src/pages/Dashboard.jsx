import { useNavigate } from "react-router-dom";
import VehicleList from "./VehicleList";
import { logout, isAdmin } from "../utils/auth";
import Alert from "../components/Alert";

export default function Dashboard() {
  const navigate = useNavigate();
  const successMessage = window.history.state?.usr?.successMessage;

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage the dealership inventory from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {isAdmin() && (
              <button
                type="button"
                onClick={() => navigate("/vehicles/new")}
                className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Vehicle
              </button>
            )}

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>
        </div>

        {successMessage ? (
          <Alert type="success" className="mb-4">
            {successMessage}
          </Alert>
        ) : null}

      <VehicleList />
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";
import VehicleList from "./VehicleList";
import { logout, isAdmin } from "../utils/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <button onClick={handleLogout}>
        Logout
      </button>

      {isAdmin() && (
        <button onClick={() => navigate("/vehicles/new")}>
          Create Vehicle
        </button>
      )}

      <VehicleList />
    </div>
  );
}
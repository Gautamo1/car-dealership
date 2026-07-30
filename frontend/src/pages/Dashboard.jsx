import { useNavigate } from "react-router-dom";
import VehicleList from "./VehicleList";
import { logout } from "../utils/auth";

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

      <VehicleList />
    </div>
  );
}
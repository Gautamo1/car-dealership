import { useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      style={{ cursor: "pointer" }}
    >
      {vehicle.make}
    </li>
  );
}
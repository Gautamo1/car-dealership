import { useNavigate } from "react-router-dom";

export default function VehicleCard({ vehicle }) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      style={{
        cursor: "pointer",
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
        borderRadius: "8px",
      }}
    >
      <h3>{vehicle.make}</h3>

      <p>{vehicle.model}</p>

      <p>{vehicle.year}</p>

      <p>{vehicle.category}</p>

      <p>${vehicle.price.toLocaleString()}</p>
    </li>
  );
}
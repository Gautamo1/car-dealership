import { useNavigate } from "react-router-dom";

export default function VehicleCard({
  vehicle,
  onDelete,
}) {
  const navigate = useNavigate();

  return (
    <li
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "10px",
      }}
    >
      <h3
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/vehicles/${vehicle.id}`)}
      >
        {vehicle.make}
      </h3>

      <p>{vehicle.model}</p>
      <p>{vehicle.year}</p>
      <p>{vehicle.category}</p>
      <p>${vehicle.price.toLocaleString()}</p>

      <button
        onClick={() => onDelete(vehicle.id)}
      >
        Delete
      </button>
    </li>
  );
}
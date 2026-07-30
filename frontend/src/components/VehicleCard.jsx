import { useNavigate } from "react-router-dom";

export default function VehicleCard({
  vehicle,
  onDelete,
  onPurchase,
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
      <p>Stock: {vehicle.stock}</p>

      <button
        onClick={() => onDelete(vehicle.id)}
      >
        Delete
      </button>
      <button
     onClick={() => onPurchase(vehicle.id)}
     disabled={vehicle.stock === 0}
    >
     Purchase
   </button>
    </li>
  );
}
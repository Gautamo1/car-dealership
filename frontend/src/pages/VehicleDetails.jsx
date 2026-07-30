import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicle } from "../api/vehicle";

export default function VehicleDetails() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    async function loadVehicle() {
      const data = await getVehicle(id);
      setVehicle(data);
    }

    loadVehicle();
  }, [id]);

  if (!vehicle) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{vehicle.make}</h1>

      <p>{vehicle.model}</p>

      <p>{vehicle.year}</p>

      <p>{vehicle.category}</p>

      <p>${vehicle.price.toLocaleString()}</p>
    </div>
  );
}
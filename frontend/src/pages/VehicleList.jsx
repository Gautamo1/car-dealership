import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicle";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    async function loadVehicles() {
      const data = await getVehicles();
      setVehicles(data);
    }

    loadVehicles();
  }, []);

  return (
    <div>
      <h1>Vehicles</h1>

      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id}>
            {vehicle.make}
          </li>
        ))}
      </ul>
    </div>
  );
}
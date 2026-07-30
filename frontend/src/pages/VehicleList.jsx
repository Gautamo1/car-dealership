import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicle";
import VehicleCard from "../components/VehicleCard";

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
            <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            />
        ))}
      </ul>
    </div>
  );
}
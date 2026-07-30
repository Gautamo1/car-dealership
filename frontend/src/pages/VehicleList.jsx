import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import {
  getVehicles,
  deleteVehicle,
} from "../api/vehicle";
import { purchaseVehicle } from "../api/inventory";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  async function loadVehicles() {
    const data = await getVehicles();
    setVehicles(data);
  }

  async function handleDelete(id) {
    await deleteVehicle(id);
    await loadVehicles();
  }

  async function handlePurchase(id) {
    await purchaseVehicle(id);
    await loadVehicles();
  }

  useEffect(() => {
    loadVehicles();
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const query = search.toLowerCase();

    return (
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.category.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <h1>Vehicles</h1>

      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {filteredVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onDelete={handleDelete}
            onPurchase={handlePurchase}
          />
        ))}
      </ul>
    </div>
  );
}
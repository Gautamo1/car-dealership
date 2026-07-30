import { useEffect, useState } from "react";
import VehicleCard from "../components/VehicleCard";
import { useNavigate } from "react-router-dom";
import {
  getVehicles,
  deleteVehicle,
} from "../api/vehicle";



export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  async function loadVehicles() {
    const data = await getVehicles();
    setVehicles(data);
}

  async function handleDelete(id) {
    await deleteVehicle(id);
    await loadVehicles();
  }

  useEffect(() => {
    async function loadVehicles() {
      const data = await getVehicles();
      setVehicles(data);
    }

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
  console.log(localStorage.getItem("token"));
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
          />
        ))}
      </ul>
    </div>
  );
}
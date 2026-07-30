import { useEffect, useState } from "react";
import { getVehicles } from "../api/vehicle";
import VehicleCard from "../components/VehicleCard";
import { useNavigate } from "react-router-dom";

export default function VehicleList() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <h1>Vehicles</h1>
      <button onClick={() => navigate("/vehicles/new")}>
        Add Vehicle
      </button>
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
          />
        ))}
      </ul>
    </div>
  );
}
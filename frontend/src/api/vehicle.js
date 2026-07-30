import api from "./api";

export async function getVehicles() {
  const response = await api.get("/vehicles");
  return response.data;
}

export async function getVehicle(id) {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
}

export async function createVehicle(vehicle) {
  const response = await api.post("/vehicles", vehicle);
  return response.data;
}

export async function updateVehicle(id, vehicle) {
  const response = await api.put(`/vehicles/${id}`, vehicle);
  return response.data;
}
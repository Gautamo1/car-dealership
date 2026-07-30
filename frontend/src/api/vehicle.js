import api from "./api";

export async function getVehicles() {
  const response = await api.get("/vehicles");
  return response.data;
}

export async function getVehicle(id) {
  const response = await api.get(`/vehicles/${id}`);
  return response.data;
}
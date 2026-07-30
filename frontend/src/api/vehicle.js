import api from "./api";

export async function getVehicles() {
  const response = await api.get("/vehicles");
  return response.data;
}
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
  try {
    const response = await api.post("/vehicles", vehicle);
    return response.data;
  } catch (error) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    throw error;
  }
}

export async function updateVehicle(id, vehicle) {
  const response = await api.put(`/vehicles/${id}`, vehicle);
  return response.data;
}

export async function deleteVehicle(id) {
  const response = await api.delete(`/vehicles/${id}`);
  return response.data;
}
import api from "./api";

export async function purchaseVehicle(id) {
  const response = await api.post(`/vehicles/${id}/purchase`);
  return response.data;
}

export async function restockVehicle(id, quantity) {
  const response = await api.post(
    `/vehicles/${id}/restock`,
    {
      quantity,
    }
  );

  return response.data;
}
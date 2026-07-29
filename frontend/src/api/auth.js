import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});

export async function login(credentials) {
  const response = await api.post("/auth/login", credentials);
  return response.data;
}
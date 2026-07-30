import { jwtDecode } from "jwt-decode";

export function getToken() {
  return localStorage.getItem("token");
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getUserRole() {
  const token = getToken();

  if (!token) {
    return null;
  }

  try {
    const payload = jwtDecode(token);
    return payload.role;
  } catch {
    return null;
  }
}

export function isAdmin() {
  return getUserRole() === "admin";
}
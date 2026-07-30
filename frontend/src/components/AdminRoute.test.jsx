import { describe, test, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import jwtEncode from "jwt-encode";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";

function createToken(role) {
  return jwtEncode(
    {
      sub: "1",
      role,
    },
    "secret"
  );
}

describe("AdminRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders children for admin", () => {
    localStorage.setItem("token", createToken("admin"));

    render(
      <MemoryRouter>
        <AdminRoute>
          <h1>Admin Page</h1>
        </AdminRoute>
      </MemoryRouter>
    );

    expect(
      screen.getByText("Admin Page")
    ).toBeInTheDocument();
  });

  test("redirects customer to dashboard", () => {
    localStorage.setItem("token", createToken("customer"));

    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <h1>Admin Page</h1>
              </AdminRoute>
            }
          />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  test("redirects unauthenticated user to login", () => {
    render(
      <MemoryRouter initialEntries={["/admin"]}>
        <Routes>
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <h1>Admin Page</h1>
              </AdminRoute>
            }
          />
          <Route path="/" element={<h1>Login</h1>} />
        </Routes>
      </MemoryRouter>
    );

expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
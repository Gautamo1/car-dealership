import { describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";

describe("PublicRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders login page for unauthenticated users", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <h1>Login</h1>
              </PublicRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("redirects authenticated users to dashboard", () => {
    localStorage.setItem("token", "fake-jwt");

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <h1>Login</h1>
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard"
            element={<h1>Dashboard</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });
});
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VehicleList from "./pages/VehicleList";
import VehicleDetails from "./pages/VehicleDetails";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
      
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <VehicleList />
              </ProtectedRoute>
            }
          />
      
          <Route
            path="/vehicles/:id"
            element={
              <ProtectedRoute>
                <VehicleDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}
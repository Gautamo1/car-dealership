import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import VehicleList from "./pages/VehicleList";
import VehicleDetails from "./pages/VehicleDetails";
import PublicRoute from "./components/PublicRoute";
import VehicleForm from "./pages/VehicleForm";
import VehicleEdit from "./pages/VehicleEdit";

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
            path="/vehicles/:id/edit"
            element={
              <ProtectedRoute>
                <VehicleEdit />
              </ProtectedRoute>
            }
          />
      
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
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
          <Route
            path="/vehicles/new"
            element={
              <ProtectedRoute>
                <VehicleForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
  );
}
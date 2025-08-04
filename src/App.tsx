import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SingIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";
import { initializeAuth } from "./utils/auth";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  // Initialize auth interceptors on mount
  React.useEffect(() => {
    initializeAuth();
  }, []);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />
          }
        />
        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SingIn />
          }
        />
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SingUp />
          }
        />
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

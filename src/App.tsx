import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SingIn from "./pages/SignIn";
import SingUp from "./pages/SingUp";
// 🆕 Import the new SharedBrain component
import SharedBrain from "./pages/ShareBrain";
import { initializeAuth } from "./utils/auth";
import { useAuth } from "./hooks/useAuth";
import SharedContent from "./pages/SharedContent";

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
        {/* 🔒 Protected route - Dashboard (requires authentication) */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/signin" replace />
          }
        />

        {/* 🔓 Public route - Sign In */}
        <Route
          path="/signin"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SingIn />
          }
        />

        {/* 🔓 Public route - Sign Up */}
        <Route
          path="/signup"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <SingUp />
          }
        />

        {/* 🆕 Public route - Shared Brain (NO authentication required) */}
        <Route path="/brain/:sharelink" element={<SharedBrain />} />
        <Route path="/content/:hash" element={<SharedContent />} />
        {/* 🏠 Root redirect */}
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />

        {/* 🚫 404 - Catch all unmatched routes */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-50">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

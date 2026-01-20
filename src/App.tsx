import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import SingIn from "./pages/SignIn";
import SingUp from "./pages/SignUp";
import SharedBrain from "./pages/ShareBrain";
import SharedContent from "./pages/SharedContent";
import ContentDetails from "./pages/ContentDetails";
import ProfileSettings from "./pages/ProfileSettings";
import { initializeAuth } from "./utils/auth";
import { useAuth } from "./hooks/useAuth";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    initializeAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
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

        <Route path="/brain/:sharelink" element={<SharedBrain />} />
        <Route path="/content/:hash" element={<SharedContent />} />

        <Route
          path="/content/view/:contentId"
          element={
            isAuthenticated ? (
              <ContentDetails />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <ProfileSettings />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? "/dashboard" : "/signin"} replace />
          }
        />

        <Route
          path="*"
          element={
            <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                  404
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                  Page Not Found
                </p>
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

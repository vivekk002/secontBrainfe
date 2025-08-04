import axios from "axios";
import { BACKEND_URL } from "../config";

// Check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true; // If we can't parse the token, consider it expired
  }
};

// Logout function
export const logout = async () => {
  try {
    // Call backend to invalidate token
    await axios.post(`${BACKEND_URL}/logout`);
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    // Clear local storage and redirect regardless of backend response
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/signin";
  }
};

interface propTypes {
  name: string;
  jwt: string;
}

// Login function
export const login = ({ jwt, name }: propTypes) => {
  localStorage.setItem("token", jwt);
  localStorage.setItem("user", name);
  // Dispatch a custom event to notify components about the login
  window.dispatchEvent(
    new CustomEvent("authStateChanged", { detail: { isAuthenticated: true } })
  );
};

// Validate token and redirect if expired
export const validateToken = (): boolean => {
  const token = localStorage.getItem("token");

  if (!token) {
    logout();
    return false;
  }

  if (isTokenExpired(token)) {
    logout();
    return false;
  }

  return true;
};

// Setup axios interceptors for automatic token validation
export const setupAxiosInterceptors = () => {
  // Request interceptor to add token to headers
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle token expiration
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        // Token is invalid or expired
        logout();
      }
      return Promise.reject(error);
    }
  );
};

// Initialize auth setup
export const initializeAuth = () => {
  setupAxiosInterceptors();
};

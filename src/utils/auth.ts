import axios from "axios";
import { BACKEND_URL } from "../config";

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    return true;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${BACKEND_URL}/logout`);
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profilePicture");
    window.location.href = "/signin";
  }
};

interface propTypes {
  name: string;
  jwt: string;
  profilePicture?: string;
}

export const login = ({ jwt, name, profilePicture }: propTypes) => {
  localStorage.setItem("token", jwt);
  localStorage.setItem("user", name);
  if (profilePicture) {
    localStorage.setItem("profilePicture", profilePicture);
  }
  window.dispatchEvent(
    new CustomEvent("authStateChanged", { detail: { isAuthenticated: true } }),
  );
};

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

export const setupAxiosInterceptors = () => {
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
    },
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );
};

export const initializeAuth = () => {
  setupAxiosInterceptors();
};

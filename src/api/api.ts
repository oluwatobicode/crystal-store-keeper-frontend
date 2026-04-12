import axios from "axios";

const BASE_URL = "https://api.crystalstore.oluwatobii.xyz/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("jwt") : null;
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("jwt", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
  }
};

export default api;

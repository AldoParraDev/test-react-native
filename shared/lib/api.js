import axios from "axios";
import { useAuthStore } from "../../domains/auth/auth.store";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // 👈 ENV para RN
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

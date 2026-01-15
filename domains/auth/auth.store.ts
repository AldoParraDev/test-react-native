import { create } from "zustand";
import { secureStore } from "../../infrastructure/storage/secure.store";
import api from "../../shared/lib/api";

export const useAuthStore = create((set) => ({
  token: null,
  isAuthenticated: false,
  isLoading: true,

  login: async (token) => {
    await secureStore.setToken(token);
    set({
      token,
      isAuthenticated: true,
    });
  },

  logout: async () => {
    await secureStore.clearToken();
    set({
      token: null,
      isAuthenticated: false,
    });
  },

  restoreSession: async () => {
    const token = await secureStore.getToken();

    if (!token) {
      set({ token: null, isAuthenticated: false, isLoading: false });
      return;
    }

    set({
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  },

  refreshToken: async (): Promise<boolean> => {
    try {
      const response = await api.post("/auth/refresh");

      if (response.data?.access_token) {
        set({ token: response.data.access_token });
        return true;
      }

      return false;
    } catch (error) {
      console.error("💥 Error refrescando token:", error);
      return false;
    }
  },
}));

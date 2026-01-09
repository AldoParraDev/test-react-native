import { create } from "zustand";
import { secureStore } from "../../infrastructure/storage/secure.store";

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

    set({
      token,
      isAuthenticated: !!token,
      isLoading: false,
    });
  },
}));

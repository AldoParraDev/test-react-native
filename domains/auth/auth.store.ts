import { create } from "zustand";
import { secureStore } from "../../infrastructure/storage/secure.store";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isLoading: true,

  login: async (token: string) => {
    await secureStore.setToken(token);
    set({ isAuthenticated: true });
  },

  logout: async () => {
    await secureStore.clearToken();
    set({ isAuthenticated: false });
  },

  restoreSession: async () => {
    const token = await secureStore.getToken();
    set({
      isAuthenticated: !!token,
      isLoading: false,
    });
  },
}));

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeType } from "../../config/colors";

interface ThemeStore {
  theme: ThemeType;
  systemTheme: "light" | "dark"; // Track system preference
  setTheme: (theme: ThemeType) => void;
  setSystemTheme: (theme: "light" | "dark") => void;
  getCurrentTheme: () => "light" | "dark";
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "system",
      systemTheme: "light",

      setTheme: (theme: ThemeType) => {
        set({ theme });
      },

      setSystemTheme: (systemTheme: "light" | "dark") => {
        set({ systemTheme });
      },

      getCurrentTheme: () => {
        const state = get();
        if (state.theme === "system") {
          return state.systemTheme;
        }
        return state.theme;
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

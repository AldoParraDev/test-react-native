export type ThemeMode = "light" | "dark" | "system";

export interface ThemeContextType {
  theme: ThemeMode;
  currentTheme: "light" | "dark";
  setTheme: (theme: ThemeMode) => void;
}

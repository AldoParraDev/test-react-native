/**
 * Color palette for light and dark themes
 */

export type ThemeType = "light" | "dark" | "system";

export const colors = {
  light: {
    // Primary colors
    primary: "#2563eb",
    primaryDark: "#1d4ed8",

    // Backgrounds
    background: "#fff",
    surface: "#f8fafc",
    surfaceSecondary: "#f3f4f6",

    // Text colors
    text: "#000",
    textSecondary: "#6b7280",
    textTertiary: "#9ca3af",

    // Borders
    border: "#e5e7eb",
    borderLight: "#ccc",

    // Status colors
    success: "#22c55e",
    successLight: "#dcfce7",

    // Icon colors
    iconPrimary: "#374151",
    iconSecondary: "#d1d5db",

    // Overlay
    overlay: "rgba(0,0,0,0.6)",
  },
  dark: {
    // Primary colors
    primary: "#3b82f6",
    primaryDark: "#1e40af",

    // Backgrounds
    background: "#0f172a",
    surface: "#1e293b",
    surfaceSecondary: "#334155",

    // Text colors
    text: "#f1f5f9",
    textSecondary: "#cbd5e1",
    textTertiary: "#94a3b8",

    // Borders
    border: "#475569",
    borderLight: "#64748b",

    // Status colors
    success: "#34d399",
    successLight: "#1f2937",

    // Icon colors
    iconPrimary: "#cbd5e1",
    iconSecondary: "#64748b",

    // Overlay
    overlay: "rgba(0,0,0,0.8)",
  },
};

export type ColorKey = keyof typeof colors.light;
export type Colors = typeof colors.light;

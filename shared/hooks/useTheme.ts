import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { colors, Colors } from "../../config/colors";
import { useThemeStore } from "../../domains/theme/theme.store";

export const useTheme = () => {
  const theme = useThemeStore((state) => state.theme);
  // const systemTheme = useThemeStore((state) => state.systemTheme);
  const setSystemTheme = useThemeStore((state) => state.setSystemTheme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const getCurrentTheme = useThemeStore((state) => state.getCurrentTheme);

  const systemColorScheme = useColorScheme();

  // Update system theme when device theme changes
  useEffect(() => {
    if (
      systemColorScheme &&
      (systemColorScheme === "light" || systemColorScheme === "dark")
    ) {
      setSystemTheme(systemColorScheme);
    }
  }, [systemColorScheme, setSystemTheme]);

  const currentTheme = getCurrentTheme();
  const themeColors: Colors = colors[currentTheme];

  return {
    theme,
    currentTheme,
    colors: themeColors,
    isDark: currentTheme === "dark",
    setTheme,
  };
};

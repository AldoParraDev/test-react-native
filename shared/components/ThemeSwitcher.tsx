import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";
import { ThemeType } from "../../config/colors";

interface ThemeSwitcherProps {
  onClose?: () => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onClose }) => {
  const { theme, colors, setTheme } = useTheme();

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    onClose?.();
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      flex: 1,
    },
    title: {
      fontSize: 14,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 12,
    },
    optionsContainer: {
      gap: 8,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 2,
    },
    optionLabel: {
      fontSize: 14,
      fontWeight: "500",
      marginLeft: 8,
    },
    selectedOption: {
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },
    unselectedOption: {
      borderColor: colors.border,
      backgroundColor: "transparent",
    },
  });

  const themeOptions: { label: string; value: ThemeType }[] = [
    { label: "Claro", value: "light" },
    { label: "Oscuro", value: "dark" },
    { label: "Sistema", value: "system" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tema</Text>
      <View style={styles.optionsContainer}>
        {themeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              theme === option.value
                ? styles.selectedOption
                : styles.unselectedOption,
            ]}
            onPress={() => handleThemeChange(option.value)}
          >
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: colors.primary,
                backgroundColor:
                  theme === option.value ? colors.primary : "transparent",
              }}
            />
            <Text
              style={[
                styles.optionLabel,
                {
                  color:
                    theme === option.value
                      ? colors.primary
                      : colors.textSecondary,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  const dynamicStyles = StyleSheet.create({
    button: {
      width: "100%",
      height: 52,
      borderRadius: 12,
      justifyContent: "center",
      alignItems: "center",
      elevation: 2,
    },
    active: {
      backgroundColor: colors.primary,
    },
    inactive: {
      backgroundColor: colors.primary,
      opacity: 0.7,
    },
    pressed: {
      transform: [{ scale: 0.98 }],
    },
    text: {
      fontSize: 16,
      fontWeight: "600",
      color: "#ffffff",
    },
    textInactive: {
      color: "#ffffff",
    },
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => {
        if (isDisabled) {
          return [dynamicStyles.button, dynamicStyles.inactive];
        }
        return [
          dynamicStyles.button,
          dynamicStyles.active,
          pressed && dynamicStyles.pressed,
        ];
      }}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <Text
          style={[dynamicStyles.text, isDisabled && dynamicStyles.textInactive]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}

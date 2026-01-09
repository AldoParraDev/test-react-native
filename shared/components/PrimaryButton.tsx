import { Pressable, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
}) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => {
        if (isDisabled) {
          return [styles.button, styles.inactive];
        }
        return [styles.button, styles.active, pressed && styles.pressed];
      }}
    >
      {loading ? (
        <ActivityIndicator color="#ffffff" size="small" />
      ) : (
        <Text style={[styles.text, isDisabled && styles.textInactive]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  active: {
    backgroundColor: "#2563eb",
  },
  inactive: {
    backgroundColor: "#2563eb",
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

import { View, StyleSheet } from "react-native";
import { useTheme } from "../hooks/useTheme";

export default function TravelCardSkeleton() {
  const { colors } = useTheme();
  const dynamicStyles = StyleSheet.create({
    card: {
      backgroundColor: colors.background,
      borderRadius: 16,
      padding: 16,
      marginBottom: 16,
      elevation: 2,
      borderWidth: 1,
      borderColor: colors.border,
    },

    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    code: {
      width: 80,
      height: 14,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },

    capacity: {
      width: 70,
      height: 22,
      borderRadius: 999,
      backgroundColor: colors.surface,
    },

    routeBlock: {
      marginTop: 12,
      gap: 8,
    },

    city: {
      width: "70%",
      height: 18,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },

    arrow: {
      width: 24,
      height: 14,
      borderRadius: 6,
      backgroundColor: colors.surface,
    },

    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },

    metaItem: {
      width: "45%",
      height: 28,
      borderRadius: 8,
      backgroundColor: colors.surface,
    },

    button: {
      marginTop: 16,
      height: 44,
      borderRadius: 12,
      backgroundColor: colors.surface,
    },
  });

  return (
    <View style={dynamicStyles.card}>
      {/* Header */}
      <View style={dynamicStyles.topRow}>
        <View style={dynamicStyles.code} />
        <View style={dynamicStyles.capacity} />
      </View>

      {/* Route */}
      <View style={dynamicStyles.routeBlock}>
        <View style={dynamicStyles.city} />
        <View style={dynamicStyles.arrow} />
        <View style={dynamicStyles.city} />
      </View>

      {/* Meta */}
      <View style={dynamicStyles.metaRow}>
        <View style={dynamicStyles.metaItem} />
        <View style={dynamicStyles.metaItem} />
      </View>

      {/* Action */}
      <View style={dynamicStyles.button} />
    </View>
  );
}

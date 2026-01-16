import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TravelSchedule } from "../boarding.types";
import { useTheme } from "../../../shared/hooks/useTheme";
import {
  formatDateDDMMYYYY,
  formatTime12hUTC,
} from "../../../shared/utils/formatDate";

type Props = {
  travel: TravelSchedule;
  onPress: () => void;
};

export default function TravelCard({ travel, onPress }: Props) {
  const { colors } = useTheme();
  const isActive = travel.is_active;

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
      color: colors.primary,
      fontWeight: "600",
      fontSize: 13,
    },
    capacity: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: colors.surface,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    capacityText: {
      color: colors.primary,
      fontWeight: "600",
      fontSize: 13,
    },
    routeBlock: {
      marginTop: 12,
      gap: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    city: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
    },
    metaRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
    },
    metaLabel: {
      fontSize: 11,
      color: colors.textSecondary,
    },
    metaValue: {
      fontSize: 14,
      fontWeight: "600",
      marginTop: 2,
      color: colors.text,
    },
    actionButton: {
      marginTop: 16,
      height: 48,
      paddingHorizontal: 16,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      backgroundColor: colors.primary,
      shadowColor: colors.primary,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 6,
    },
    actionText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "700",
    },
    pressedButton: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    disabledButton: {
      backgroundColor: colors.border,
      shadowOpacity: 0,
      elevation: 0,
    },
    disabledText: {
      color: colors.textTertiary,
    },
  });

  return (
    <View style={dynamicStyles.card}>
      {/* Header */}
      <View style={dynamicStyles.topRow}>
        <Text style={dynamicStyles.code}># {travel.route_alias}</Text>

        {/* <View style={dynamicStyles.capacity}>
          <Feather name="users" size={14} color={colors.primary} />
          <Text style={dynamicStyles.capacityText}>
            {"20"}/{"65"}
          </Text>
        </View> */}
      </View>

      {/* Route */}
      <View style={dynamicStyles.routeBlock}>
        <Text style={dynamicStyles.city}>{travel.location_departure}</Text>
        <Feather name="arrow-right" size={16} color={colors.textTertiary} />
        <Text style={dynamicStyles.city}>{travel.location_arrival}</Text>
      </View>

      {/* Meta */}
      <View style={dynamicStyles.metaRow}>
        <View>
          <Text style={dynamicStyles.metaLabel}>FECHA DE SALIDA</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View>
              <Feather name="calendar" size={14} color={colors.textSecondary} />
            </View>
            <Text style={dynamicStyles.metaValue}>
              {formatDateDDMMYYYY(travel.date)}
            </Text>
          </View>
        </View>

        <View>
          <Text style={dynamicStyles.metaLabel}>HORA DE SALIDA</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View>
              <Feather name="clock" size={14} color={colors.textSecondary} />
            </View>
            <Text style={dynamicStyles.metaValue}>
              {formatTime12hUTC(travel.date)}
            </Text>
          </View>
        </View>
      </View>

      {/* Action */}
      <Pressable
        style={({ pressed }) => [
          dynamicStyles.actionButton,
          !isActive && dynamicStyles.disabledButton,
          pressed && isActive && dynamicStyles.pressedButton,
        ]}
        onPress={isActive ? onPress : undefined}
      >
        <Feather
          name="grid"
          size={20}
          color={isActive ? "#fff" : colors.textTertiary}
        />

        <Text
          style={[
            dynamicStyles.actionText,
            !isActive && dynamicStyles.disabledText,
          ]}
        >
          {isActive ? "Gestionar abordaje" : "No iniciado"}
        </Text>
      </Pressable>
    </View>
  );
}

import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TravelSchedule } from "../boarding.types";
import {
  formatDateDDMMYYYY,
  formatTime12hUTC,
} from "../../../shared/utils/formatDate";

type Props = {
  travel: TravelSchedule;
  onPress: () => void;
};

export default function TravelCard({ travel, onPress }: Props) {
  const isActive = travel.is_active;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topRow}>
        <Text style={styles.code}># {travel.route_alias}</Text>

        <View style={styles.capacity}>
          <Feather name="users" size={14} color="#2563eb" />
          <Text style={styles.capacityText}>
            {"20"}/{"65"}
          </Text>
        </View>
      </View>

      {/* Route */}
      <View style={styles.routeBlock}>
        <Text style={styles.city}>{travel.location_departure}</Text>
        <Feather name="arrow-right" size={16} color="#9ca3af" />
        <Text style={styles.city}>{travel.location_arrival}</Text>
      </View>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View>
          <Text style={styles.metaLabel}>FECHA DE SALIDA</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View>
              <Feather name="calendar" size={14} color="#6b7280" />
            </View>
            <Text style={styles.metaValue}>
              {formatDateDDMMYYYY(travel.date)}
            </Text>
          </View>
        </View>

        <View>
          <Text style={styles.metaLabel}>HORA DE SALIDA</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <View>
              <Feather name="clock" size={14} color="#6b7280" />
            </View>
            <Text style={styles.metaValue}>
              {formatTime12hUTC(travel.date)}
            </Text>
          </View>
        </View>
      </View>

      {/* Action */}
      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          !isActive && styles.disabledButton,
          pressed && isActive && styles.pressedButton,
        ]}
        onPress={isActive ? onPress : undefined}
      >
        <Feather name="grid" size={20} color={isActive ? "#fff" : "#9ca3af"} />

        <Text style={[styles.actionText, !isActive && styles.disabledText]}>
          {isActive ? "Gestionar abordaje" : "No iniciado"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  code: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 13,
  },

  capacity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#eff6ff",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  capacityText: {
    color: "#2563eb",
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
  },

  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },

  metaLabel: {
    fontSize: 11,
    color: "#6b7280",
  },

  metaValue: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },

  actionButton: {
    marginTop: 16,
    height: 48, // h-12
    paddingHorizontal: 16, // px-4
    borderRadius: 12, // rounded-xl
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2563eb", // primary

    // Shadow iOS
    shadowColor: "#2563eb",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,

    // Shadow Android
    elevation: 6,
  },

  actionText: {
    color: "#fff",
    fontSize: 14, // text-sm
    fontWeight: "700", // font-bold
  },

  pressedButton: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },

  disabledButton: {
    backgroundColor: "#e5e7eb",
    shadowOpacity: 0,
    elevation: 0,
  },

  disabledText: {
    color: "#9ca3af",
  },
});

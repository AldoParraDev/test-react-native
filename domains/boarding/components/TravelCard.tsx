import { View, Text, StyleSheet, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TravelSchedule } from "../boarding.types";

type Props = {
  travel: TravelSchedule;
  onPress: () => void;
};

export default function TravelCard({ travel, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.route}>
          {travel.location_departure}{" "}
          <Feather name="arrow-right" size={14} color="#555" />{" "}
          {travel.location_arrival}
        </Text>

        {travel.is_active && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Activo</Text>
          </View>
        )}
      </View>

      {/* Alias */}
      <Text style={styles.alias}>{travel.route_alias}</Text>

      {/* Info */}
      <View style={styles.infoRow}>
        <Feather name="user" size={14} color="#555" />
        <Text style={styles.infoText}>{travel.driver_name}</Text>
      </View>

      <View style={styles.infoRow}>
        <Feather name="truck" size={14} color="#555" />
        <Text style={styles.infoText}>
          {travel.vehicle_name || "Sin vehículo"} -{" "}
          {travel.vehicle_plate || "N/A"}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  route: {
    fontSize: 16,
    fontWeight: "600",
  },
  alias: {
    marginTop: 4,
    fontSize: 13,
    color: "#666",
  },
  badge: {
    backgroundColor: "#22c55e",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
});

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  getTravelDetail,
  getPassengersByTravel,
} from "../../../domains/boarding/boarding.service";
import { showMessage } from "../../../shared/utils/showMessage";
import PrimaryButton from "../../../shared/components/PrimaryButton";
import { Feather } from "@expo/vector-icons";
import { formatDateDDMMYYYY } from "../../../shared/utils/formatDate";

export default function TravelDetailScreen() {
  const { travelId } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [travel, setTravel] = useState<any>(null);
  const [passengers, setPassengers] = useState<any[]>([]);

  const loadData = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const [travelRes, passengersRes] = await Promise.all([
        getTravelDetail(travelId as string),
        getPassengersByTravel(travelId as string),
      ]);

      if (!travelRes.success) {
        showMessage(travelRes.error);
        return;
      }

      if (!passengersRes.success) {
        showMessage(passengersRes.error);
        return;
      }

      console.log("pasajeros detalle:", passengersRes.data);

      setTravel(travelRes.data);
      setPassengers(passengersRes.data.passengers);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <Feather name="chevron-left" size={22} color="#2563eb" />
            <Text style={styles.backButtonText}>Atras</Text>
          </Pressable>

          <Text style={styles.route}>{travel?.route_alias}</Text>
        </View>

        <Text style={styles.subRoute}>
          {travel?.location_departure || "No definido"} hacia{" "}
          {travel?.location_arrival || "No definido"}
        </Text>

        <Text style={styles.meta}>
          {formatDateDDMMYYYY(travel?.date)} - {travel?.type_service}
        </Text>
      </View>

      {/* INFO CARD */}
      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Feather name="truck" size={16} color="#2563eb" />
          <Text style={styles.infoText}>
            {travel?.vehicle_name} - {travel?.vehicle_plate}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Feather name="user" size={16} color="#2563eb" />
          <Text style={styles.infoText}>
            {travel?.driver_name || "No asignado"}
          </Text>
        </View>
      </View>

      {/* PASAJEROS */}
      <Text style={styles.sectionTitle}>Pasajeros ({passengers.length})</Text>

      <FlatList
        data={passengers}
        keyExtractor={(item) => item.passenger_id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadData(true)}
            colors={["#2563eb"]} // Android
            tintColor="#2563eb" // iOS
          />
        }
        renderItem={({ item }) => (
          <View style={styles.passengerCard}>
            <Text style={styles.passengerName}>{item.full_name}</Text>
            <Text style={styles.passengerSeat}>Asiento {item.seat_number}</Text>
            <Text
              style={[
                styles.passengerStatus,
                item.boarding_statuss
                  ? styles.passengerStatusBoarded
                  : styles.passengerStatusPending,
              ]}
            >
              {item.boarding_status ? "Abordado" : "Pendiente"}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay pasajeros registrados</Text>
        }
      />

      {/* CTA */}
      <View style={styles.cta}>
        <PrimaryButton
          title="Escanear QR"
          onPress={() => router.push(`/scan?travelId=${travelId}`)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
  },
  route: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subRoute: {
    color: "#6b7280",
    marginTop: 4,
    fontWeight: "bold",
  },
  meta: {
    marginTop: 4,
    color: "#9ca3af",
    fontSize: 13,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
    marginBottom: 16,
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
  sectionTitle: {
    fontWeight: "600",
    marginBottom: 8,
  },
  passengerCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 1,
  },
  passengerName: {
    fontWeight: "600",
  },
  passengerSeat: {
    color: "#6b7280",
    marginTop: 2,
    fontSize: 12,
  },
  passengerStatus: {
    position: "absolute",
    top: 14,
    right: 14,
    fontWeight: "600",
  },
  passengerStatusBoarded: {
    color: "#16a34a",
  },
  passengerStatusPending: {
    color: "#dc2626",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
  },
  cta: {
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    padding: 0,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  backButtonText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "500",
  },
});

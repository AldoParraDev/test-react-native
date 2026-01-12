import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Pressable,
  TextInput,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  getTravelDetail,
  getPassengersByTravel,
} from "../../../domains/boarding/boarding.service";
import { showMessage } from "../../../shared/utils/showMessage";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { formatDateDDMMYYYY } from "../../../shared/utils/formatDate";

export default function TravelDetailScreen() {
  const { travelId } = useLocalSearchParams();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");

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

  const filteredPassengers = useMemo(() => {
    if (!search) return passengers;
    return passengers.filter(
      (p) =>
        p.full_name.toLowerCase().includes(search.toLowerCase()) ||
        String(p.seat_number).includes(search)
    );
  }, [search, passengers]);

  const boardedCount = passengers.filter((p) => p.boarding_status).length;
  const total = passengers.length;
  const progress = total ? boardedCount / total : 0;

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* APP BAR */}
      <View style={styles.appBar}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color="#374151" />
        </Pressable>

        <Text style={styles.appBarTitle}>Trip Details</Text>

        <Pressable onPress={() => loadData(true)}>
          <Feather name="refresh-cw" size={20} color="#2563eb" />
        </Pressable>
      </View>

      <FlatList
        data={filteredPassengers}
        keyExtractor={(item) => item.passenger_id}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadData(true)}
            colors={["#2563eb"]}
            tintColor="#2563eb"
          />
        }
        ListHeaderComponent={
          <>
            {/* HERO */}
            <View style={styles.heroCard}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {travel?.type_service?.toUpperCase() || "SERVICE"}
                </Text>
              </View>

              <Text style={styles.heroRoute}>
                {travel?.location_departure} – {travel?.location_arrival}
              </Text>

              <View style={styles.heroMeta}>
                <Text style={styles.heroDate}>
                  {formatDateDDMMYYYY(travel?.date)}
                </Text>
              </View>
            </View>

            {/* INFO */}
            <View style={styles.infoGrid}>
              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>VEHICLE ID</Text>
                <Text style={styles.infoValue}>
                  {travel?.vehicle_name || "N/A"}
                </Text>
              </View>

              <View style={styles.infoBox}>
                <Text style={styles.infoLabel}>DRIVER</Text>
                <Text style={styles.infoValue}>
                  {travel?.driver_name || "N/A"}
                </Text>
              </View>
            </View>

            {/* BOARDING STATUS */}
            <View style={styles.boardingHeader}>
              <View>
                <Text style={styles.boardingTitle}>Boarding Status</Text>
                <Text style={styles.boardingSubtitle}>
                  {total - boardedCount} passengers remaining
                </Text>
              </View>

              <Text style={styles.boardingCount}>
                {boardedCount}
                <Text style={styles.boardingTotal}>/{total}</Text>
              </Text>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progress * 100}%` }]}
              />
            </View>

            {/* SEARCH */}
            <View style={styles.searchBox}>
              <Feather name="search" size={18} color="#9ca3af" />
              <TextInput
                placeholder="Search name or seat number..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>
          </>
        }
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={styles.passengerCard}>
            <View
              style={[
                styles.avatar,
                item.boarding_status && styles.avatarChecked,
              ]}
            >
              {item.boarding_status ? (
                <Feather name="check" size={16} color="#22c55e" />
              ) : (
                <Feather name="user" size={16} color="#9ca3af" />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.passengerName}>{item.full_name}</Text>
              <Text style={styles.passengerSeat}>Seat: {item.seat_number}</Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                item.boarding_status
                  ? styles.statusBoarded
                  : styles.statusPending,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  item.boarding_status
                    ? styles.statusBoardedText
                    : styles.statusPendingText,
                ]}
              >
                {item.boarding_status ? "BOARDED" : "PENDING"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No passengers found</Text>
        }
      />

      {/* CTA */}
      <View style={styles.cta}>
        <Pressable
          style={styles.ctaButton}
          onPress={() => router.push(`/boarding/${travelId}/scan`)}
        >
          <MaterialIcons name="qr-code-scanner" size={22} color="#fff" />
          <Text style={styles.ctaText}>Start Boarding</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  appBar: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  appBarTitle: { fontSize: 16, fontWeight: "600" },

  heroCard: {
    backgroundColor: "#f8fafc",
    margin: 16,
    borderRadius: 20,
    padding: 16,
  },
  badge: {
    backgroundColor: "#2563eb",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },
  heroRoute: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "700",
  },
  heroMeta: { marginTop: 4 },
  heroDate: { color: "#6b7280", fontSize: 13 },

  infoGrid: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 16,
  },
  infoBox: {
    flex: 1,
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 14,
  },
  infoLabel: { fontSize: 11, color: "#9ca3af", fontWeight: "600" },
  infoValue: { marginTop: 4, fontSize: 16, fontWeight: "700" },

  boardingHeader: {
    marginTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boardingTitle: { fontSize: 16, fontWeight: "700" },
  boardingSubtitle: { fontSize: 13, color: "#6b7280" },
  boardingCount: { fontSize: 22, fontWeight: "700", color: "#2563eb" },
  boardingTotal: { fontSize: 14, color: "#9ca3af" },

  progressBar: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 999,
    marginHorizontal: 16,
    marginTop: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 999,
  },

  searchBox: {
    margin: 16,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchInput: { flex: 1, height: 48 },

  passengerCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarChecked: { backgroundColor: "#dcfce7" },

  passengerName: { fontWeight: "600" },
  passengerSeat: { fontSize: 12, color: "#6b7280" },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusBoarded: { backgroundColor: "#dcfce7" },
  statusPending: { backgroundColor: "#e5e7eb" },
  statusText: { fontSize: 12, fontWeight: "700" },
  statusBoardedText: { color: "#16a34a" },
  statusPendingText: { color: "#6b7280" },

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
  ctaButton: {
    height: 56,
    backgroundColor: "#1d4ed8",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    elevation: 6,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});

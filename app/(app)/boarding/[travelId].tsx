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
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  getTravelDetail,
  getPassengersByTravel,
} from "../../../domains/boarding/boarding.service";
import { showMessage } from "../../../shared/utils/showMessage";
import { useTheme } from "../../../shared/hooks/useTheme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { formatDateDDMMYYYY } from "../../../shared/utils/formatDate";

export default function TravelDetailScreen() {
  const { travelId } = useLocalSearchParams();
  const { colors } = useTheme();

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

  // useEffect(() => {
  //   loadData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

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

  const dynamicStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.background,
    },
    appBar: {
      height: 56,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.background,
    },
    appBarTitle: { fontSize: 16, fontWeight: "600", color: colors.text },
    heroCard: {
      backgroundColor: colors.surface,
      margin: 16,
      borderRadius: 20,
      padding: 16,
    },
    badge: {
      backgroundColor: colors.primary,
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
      color: colors.text,
    },
    heroMeta: { marginTop: 4 },
    heroDate: { color: colors.textSecondary, fontSize: 13 },
    infoGrid: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
    },
    infoBox: {
      flex: 1,
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 14,
    },
    infoLabel: { fontSize: 11, color: colors.textTertiary, fontWeight: "600" },
    infoValue: {
      marginTop: 4,
      fontSize: 16,
      fontWeight: "700",
      color: colors.text,
    },
    boardingHeader: {
      marginTop: 24,
      paddingHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    boardingTitle: { fontSize: 16, fontWeight: "700", color: colors.text },
    boardingSubtitle: { fontSize: 13, color: colors.textSecondary },
    boardingCount: { fontSize: 22, fontWeight: "700", color: colors.primary },
    boardingTotal: { fontSize: 14, color: colors.textTertiary },
    progressBar: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 999,
      marginHorizontal: 16,
      marginTop: 8,
    },
    progressFill: {
      height: "100%",
      backgroundColor: colors.primary,
      borderRadius: 999,
    },
    searchBox: {
      margin: 16,
      backgroundColor: colors.surface,
      borderRadius: 14,
      paddingHorizontal: 12,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderWidth: 1,
      borderColor: colors.border,
    },
    searchInput: {
      flex: 1,
      height: 48,
      color: colors.text,
    },
    passengerCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 14,
      marginHorizontal: 16,
      marginBottom: 8,
      borderRadius: 16,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 1,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.surfaceSecondary,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 12,
    },
    avatarChecked: { backgroundColor: colors.successLight },
    passengerName: { fontWeight: "600", color: colors.text },
    passengerSeat: { fontSize: 12, color: colors.textSecondary },
    statusBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 999,
    },
    statusBoarded: { backgroundColor: colors.successLight },
    statusPending: { backgroundColor: colors.border },
    statusText: { fontSize: 12, fontWeight: "700" },
    statusBoardedText: { color: colors.success },
    statusPendingText: { color: colors.textSecondary },
    empty: {
      textAlign: "center",
      marginTop: 40,
      color: colors.textSecondary,
    },
    cta: {
      position: "absolute",
      bottom: 16,
      left: 16,
      right: 16,
    },
    ctaButton: {
      height: 56,
      backgroundColor: colors.primaryDark,
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      elevation: 6,
    },
    ctaText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });

  if (loading) {
    return (
      <View style={dynamicStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={dynamicStyles.container}>
      {/* APP BAR */}
      <View style={dynamicStyles.appBar}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={22} color={colors.iconPrimary} />
        </Pressable>

        <Text style={dynamicStyles.appBarTitle}>Detalles del viaje</Text>

        <Pressable onPress={() => loadData(true)}>
          <Feather name="refresh-cw" size={20} color={colors.primary} />
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
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListHeaderComponent={
          <>
            {/* HERO */}
            <View style={dynamicStyles.heroCard}>
              <View style={dynamicStyles.badge}>
                <Text style={dynamicStyles.badgeText}>
                  {travel?.type_service?.toUpperCase() || "SERVICIO"}
                </Text>
              </View>

              <Text style={dynamicStyles.heroRoute}>
                {travel?.location_departure} – {travel?.location_arrival}
              </Text>

              <View style={dynamicStyles.heroMeta}>
                <Text style={dynamicStyles.heroDate}>
                  {formatDateDDMMYYYY(travel?.date)}
                </Text>
              </View>
            </View>

            {/* INFO */}
            <View style={dynamicStyles.infoGrid}>
              <View style={dynamicStyles.infoBox}>
                <Text style={dynamicStyles.infoLabel}>ID DEL VEHÍCULO</Text>
                <Text style={dynamicStyles.infoValue}>
                  {travel?.vehicle_name || "No disponible"}
                </Text>
              </View>

              <View style={dynamicStyles.infoBox}>
                <Text style={dynamicStyles.infoLabel}>CONDUCTOR</Text>
                <Text style={dynamicStyles.infoValue}>
                  {travel?.driver_name || "No disponible"}
                </Text>
              </View>
            </View>

            {/* BOARDING STATUS */}
            <View style={dynamicStyles.boardingHeader}>
              <View>
                <Text style={dynamicStyles.boardingTitle}>
                  Estado de abordaje
                </Text>
                <Text style={dynamicStyles.boardingSubtitle}>
                  {total - boardedCount} pasajeros pendientes
                </Text>
              </View>

              <Text style={dynamicStyles.boardingCount}>
                {boardedCount}
                <Text style={dynamicStyles.boardingTotal}>/{total}</Text>
              </Text>
            </View>

            <View style={dynamicStyles.progressBar}>
              <View
                style={[
                  dynamicStyles.progressFill,
                  { width: `${progress * 100}%` },
                ]}
              />
            </View>

            {/* SEARCH */}
            <View style={dynamicStyles.searchBox}>
              <Feather name="search" size={18} color={colors.textTertiary} />
              <TextInput
                placeholder="Buscar nombre o número de asiento..."
                value={search}
                onChangeText={setSearch}
                placeholderTextColor={colors.textTertiary}
                style={dynamicStyles.searchInput}
              />
            </View>
          </>
        }
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <View style={dynamicStyles.passengerCard}>
            <View
              style={[
                dynamicStyles.avatar,
                item.boarding_status && dynamicStyles.avatarChecked,
              ]}
            >
              {item.boarding_status ? (
                <Feather name="check" size={16} color={colors.success} />
              ) : (
                <Feather name="user" size={16} color={colors.textTertiary} />
              )}
            </View>

            <View style={{ flex: 1 }}>
              <Text style={dynamicStyles.passengerName}>{item.full_name}</Text>
              <Text style={dynamicStyles.passengerSeat}>
                Asiento: {item.seat_number}
              </Text>
            </View>

            <View
              style={[
                dynamicStyles.statusBadge,
                item.boarding_status
                  ? dynamicStyles.statusBoarded
                  : dynamicStyles.statusPending,
              ]}
            >
              <Text
                style={[
                  dynamicStyles.statusText,
                  item.boarding_status
                    ? dynamicStyles.statusBoardedText
                    : dynamicStyles.statusPendingText,
                ]}
              >
                {item.boarding_status ? "ABORDADO" : "PENDIENTE"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={dynamicStyles.empty}>No se encontraron pasajeros</Text>
        }
      />

      {/* CTA */}
      <View style={dynamicStyles.cta}>
        <Pressable
          style={dynamicStyles.ctaButton}
          onPress={() => router.push(`/boarding/${travelId}/scan`)}
        >
          <MaterialIcons name="qr-code-scanner" size={22} color="#fff" />
          <Text style={dynamicStyles.ctaText}>Iniciar abordaje</Text>
        </Pressable>
      </View>
    </View>
  );
}

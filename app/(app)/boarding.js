import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { router } from "expo-router";
import { getTravelsToday } from "../../domains/boarding/boarding.service";
import { showMessage } from "../../shared/utils/showMessage";
import { useEffect, useState } from "react";
import TravelCard from "../../domains/boarding/components/TravelCard";
import TravelCardSkeleton from "../../shared/components/TravelCardSkeleton";
import { BoardingHeader } from "../../domains/boarding/components/BoardingHeader";
import SearchInput from "../../shared/components/SearchInput";
import { useTheme } from "../../shared/hooks/useTheme";
import { Feather } from "@expo/vector-icons";

export default function BoardingScreen() {
  const { colors } = useTheme();
  const [listTravels, setListTravels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const filteredTravels = listTravels.filter((travel) => {
    const q = search.toLowerCase();

    return (
      travel.location_departure.toLowerCase().includes(q) ||
      travel.location_arrival.toLowerCase().includes(q) ||
      travel.route_alias?.toLowerCase().includes(q) ||
      travel.driver_name?.toLowerCase().includes(q) ||
      travel.vehicle_plate?.toLowerCase().includes(q)
    );
  });

  const loadTravels = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getTravelsToday();

      if (!response.success) {
        showMessage(response.error, "error");
        return;
      }

      setListTravels(response.data.travels);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTravels();
  }, []);

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    list: {
      padding: 16,
      paddingBottom: 100,
      backgroundColor: colors.surface,
    },
    emptyContainer: {
      marginTop: 60,
      alignItems: "center",
    },
    emptyText: {
      color: colors.textSecondary,
      marginTop: 8,
    },
  });

  return (
    <View style={dynamicStyles.container}>
      <BoardingHeader onRefresh={loadTravels} />

      <FlatList
        data={loading ? Array.from({ length: 3 }) : filteredTravels}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <SearchInput value={search} onChange={setSearch} />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={dynamicStyles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadTravels(true)}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        renderItem={({ item }) =>
          loading ? (
            <TravelCardSkeleton />
          ) : (
            <TravelCard
              travel={item}
              onPress={() => router.push(`/boarding/${item.travel_id}`)}
            />
          )
        }
        ListEmptyComponent={
          !loading && (
            <View style={dynamicStyles.emptyContainer}>
              <Feather name="search" size={32} color={colors.iconSecondary} />
              <Text style={dynamicStyles.emptyText}>
                No se encontraron viajes
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

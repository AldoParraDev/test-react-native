import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import { router } from "expo-router";
import { getTravelsToday } from "../../domains/boarding/boarding.service";
import { showMessage } from "../../shared/utils/showMessage";
import { useEffect, useState } from "react";
import TravelCard from "../../domains/boarding/components/TravelCard";
import TravelCardSkeleton from "../../shared/components/TravelCardSkeleton";

export default function BoardingScreen() {
  const [listTravels, setListTravels] = useState([]);

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.title}>Abordaje Express</Text>
      </View>
      {/* LISTADO AQUI */}
      <FlatList
        data={loading ? Array.from({ length: 3 }) : listTravels}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 4, paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => loadTravels(true)}
            colors={["#2563eb"]} // Android
            tintColor="#2563eb" // iOS
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
            <View style={{ alignItems: "center", marginTop: 80 }}>
              <Text style={{ color: "#6b7280" }}>
                No hay viajes programados para hoy
              </Text>
            </View>
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9fafb",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#666",
  },
});

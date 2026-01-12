import { View, StyleSheet } from "react-native";

export default function TravelCardSkeleton() {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topRow}>
        <View style={styles.code} />
        <View style={styles.capacity} />
      </View>

      {/* Route */}
      <View style={styles.routeBlock}>
        <View style={styles.city} />
        <View style={styles.arrow} />
        <View style={styles.city} />
      </View>

      {/* Meta */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem} />
        <View style={styles.metaItem} />
      </View>

      {/* Action */}
      <View style={styles.button} />
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
    width: 80,
    height: 14,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
  },

  capacity: {
    width: 70,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
  },

  routeBlock: {
    marginTop: 12,
    gap: 8,
  },

  city: {
    width: "70%",
    height: 18,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
  },

  arrow: {
    width: 24,
    height: 14,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
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
    backgroundColor: "#e5e7eb",
  },

  button: {
    marginTop: 16,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
  },
});

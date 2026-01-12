import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function BoardingHeader({ onRefresh }: { onRefresh: () => void }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lista de viajes</Text>

        <Pressable style={styles.headerAction} onPress={onRefresh}>
          <Feather name="refresh-cw" size={20} color="#2563eb" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    backgroundColor: "#fff",
  },

  header: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  headerAction: {
    position: "absolute",
    right: 16,
    padding: 6,
  },
});

import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserDropdown } from "./UserDropdown";

export function BoardingHeader({ onRefresh }: { onRefresh: () => void }) {
  return (
    <View style={styles.safe}>
      <View style={styles.header}>
        <UserDropdown />

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },

  headerAction: {
    padding: 6,
  },
});

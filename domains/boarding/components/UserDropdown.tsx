import { useState } from "react";
import { Pressable, StyleSheet, Text, View, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuthStore } from "../../auth/auth.store";
import { router } from "expo-router";

export function UserDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const logout = useAuthStore((state: any) => state.logout);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace("/login");
  };

  return (
    <>
      <Pressable
        style={styles.avatarButton}
        onPress={() => setDropdownOpen(true)}
      >
        <Feather name="user" size={20} color="#2563eb" />
      </Pressable>

      <Modal
        visible={dropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setDropdownOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setDropdownOpen(false)}
        >
          <View style={styles.dropdownMenu}>
            <Pressable style={styles.menuItem} onPress={handleLogout}>
              <Feather name="log-out" size={18} color="#ef4444" />
              <Text style={styles.menuItemText}>Cerrar sesión</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  avatarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eff6ff",
    justifyContent: "center",
    alignItems: "center",
  },

  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },

  dropdownMenu: {
    position: "absolute",
    top: 60,
    left: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    minWidth: 200,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    overflow: "hidden",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },

  menuItemText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#ef4444",
  },
});

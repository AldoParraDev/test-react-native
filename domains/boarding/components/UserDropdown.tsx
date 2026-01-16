import { useState, useRef, useEffect } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Animated,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuthStore } from "../../auth/auth.store";
import { useTheme } from "../../../shared/hooks/useTheme";
import { ThemeSwitcher } from "../../../shared/components/ThemeSwitcher";
import { router } from "expo-router";

export function UserDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { colors } = useTheme();
  const logout = useAuthStore((state: any) => state.logout);
  // Animación para deslizar desde la izquierda
  const slideAnim = useRef(new Animated.Value(-500)).current;

  // Animar entrada y salida
  useEffect(() => {
    if (dropdownOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [dropdownOpen, slideAnim]);

  const handleClose = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    router.replace("/login");
  };

  const dynamicStyles = StyleSheet.create({
    avatarButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.surface,
      justifyContent: "center",
      alignItems: "center",
    },
    backdrop: {
      flex: 1,
      backgroundColor: colors.overlay,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    sheet: {
      backgroundColor: colors.background,
      paddingTop: 24,
      paddingBottom: 12,
      paddingLeft: 16,
      paddingRight: 16,
      // borderTopLeftRadius: 24,
      // borderBottomLeftRadius: 24,
      elevation: 12,
      shadowColor: "#000",
      shadowOffset: { width: -4, height: 0 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      width: "70%",
      height: "100%",
      borderRightWidth: 1,
      borderRightColor: colors.border,
    },
    sheetContent: {
      flex: 1,
    },
    sheetHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    sheetTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: colors.text,
    },
    closeButton: {
      padding: 0,
    },
    divider: {
      height: 1,
      backgroundColor: colors.border,
      marginVertical: 12,
      marginHorizontal: -16,
    },
    menuItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      gap: 12,
      borderRadius: 12,
      marginVertical: 4,
    },
    menuItemText: {
      fontSize: 15,
      fontWeight: "500",
      color: "#ef4444",
    },
  });

  return (
    <>
      <Pressable
        style={dynamicStyles.avatarButton}
        onPress={() => setDropdownOpen(true)}
      >
        <Feather name="user" size={20} color={colors.primary} />
      </Pressable>

      <Modal
        visible={dropdownOpen}
        transparent
        animationType="none"
        onRequestClose={handleClose}
      >
        <Pressable style={dynamicStyles.backdrop} onPress={handleClose}>
          <Animated.View
            style={[
              dynamicStyles.sheet,
              {
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            {/* Header */}
            <View style={dynamicStyles.sheetHeader}>
              <Text style={dynamicStyles.sheetTitle}>Menú</Text>
              <Pressable
                style={dynamicStyles.closeButton}
                onPress={handleClose}
              >
                <Feather name="x" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>

            {/* Content */}
            <View style={dynamicStyles.sheetContent}>
              <ThemeSwitcher onClose={handleClose} />
              <View style={dynamicStyles.divider} />

              <Pressable style={dynamicStyles.menuItem} onPress={handleLogout}>
                <Feather name="log-out" size={18} color="#ef4444" />
                <Text style={dynamicStyles.menuItemText}>Cerrar sesión</Text>
              </Pressable>
            </View>
          </Animated.View>
        </Pressable>
      </Modal>
    </>
  );
}

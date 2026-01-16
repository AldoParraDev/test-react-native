import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { UserDropdown } from "./UserDropdown";
import { useTheme } from "../../../shared/hooks/useTheme";

export function BoardingHeader({ onRefresh }: { onRefresh: () => void }) {
  const { colors } = useTheme();

  const dynamicStyles = StyleSheet.create({
    safe: {
      backgroundColor: colors.background,
    },
    header: {
      height: 56,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.background,
      paddingHorizontal: 12,
    },
    headerTitle: {
      fontSize: 16,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
      color: colors.text,
    },
    headerAction: {
      padding: 6,
    },
  });

  return (
    <View style={dynamicStyles.safe}>
      <View style={dynamicStyles.header}>
        <UserDropdown />

        <Text style={dynamicStyles.headerTitle}>Lista de viajes</Text>

        <Pressable style={dynamicStyles.headerAction} onPress={onRefresh}>
          <Feather name="refresh-cw" size={20} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  );
}

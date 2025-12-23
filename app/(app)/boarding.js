import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import { useAuthStore } from "../../domains/auth/auth.store";

export default function BoardingScreen() {
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    await logout();
    router.replace("/login");
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Abordaje Express</Text>
        <Button title="Escanear QR" onPress={() => router.push("/scan")} />
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

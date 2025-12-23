import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../domains/auth/auth.store";

export default function AppLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null; // splash activo
  }

  return (
    <>
      {!isAuthenticated && <Redirect href="/login" />}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </>
  );
}

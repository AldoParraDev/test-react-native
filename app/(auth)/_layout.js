import { Stack, Redirect } from "expo-router";
import { useAuthStore } from "../../domains/auth/auth.store";

export default function AuthLayout() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null;
  }

  return (
    <>
      {isAuthenticated && <Redirect href="/boarding" />}

      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </>
  );
}

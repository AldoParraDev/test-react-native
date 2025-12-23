import { Redirect } from "expo-router";
import { useAuthStore } from "../domains/auth/auth.store";

export default function Index() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return null; // splash luego
  }

  return <Redirect href={isAuthenticated ? "/boarding" : "/login"} />;
}

import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";

// this layout is used for all routes that are protected, d.h. die nur angezeigt werden, wenn der User eingeloggt ist

export default function ProtectedLayout() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Slot />;
}

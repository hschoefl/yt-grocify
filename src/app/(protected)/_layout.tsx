// import { useAuth } from "@/providers/AuthProvider";
import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

// this layout is used for all routes that are protected, d.h. die nur angezeigt werden, wenn der User eingeloggt ist

export default function ProtectedLayout() {
  console.log("Protected Layout");

  // const { isAuthenticated } = useAuth();
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

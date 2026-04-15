<<<<<<< HEAD
import { tokenCache } from "@clerk/expo/token-cache";
import { Stack } from "expo-router";
import "../../global.css";
=======
import { Slot } from "expo-router";
>>>>>>> 9c6053a (disable clerk and use fake auth)

import { AuthProvider } from "@/providers/AuthProvider";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  console.log("Root Layout");
  return (
<<<<<<< HEAD
    // <AuthProvider>
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Stack screenOptions={{ headerShown: false }} />
    </ClerkProvider>
    // </AuthProvider>
=======
    <AuthProvider>
      <Slot />
    </AuthProvider>
>>>>>>> 9c6053a (disable clerk and use fake auth)
  );
}

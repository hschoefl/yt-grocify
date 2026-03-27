import { tokenCache } from "@clerk/expo/token-cache";
import { Slot } from "expo-router";

import { ClerkProvider } from "@clerk/expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

export default function RootLayout() {
  console.log("Root Layout");
  return (
    // <AuthProvider>
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider>
    // </AuthProvider>
  );
}

import { useAuth } from "@/providers/AuthProvider";
// import { useAuth } from "@clerk/expo";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
  const { isAuthenticated: isSignedIn, signOut } = useAuth();
  const router = useRouter();

  const onSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <Text className="text-xl font-bold">Welcome Screen</Text>

      <Text>Is Authenticated: {isSignedIn ? "Yes" : "No"}</Text>

      <Button title="Sign Out" onPress={onSignOut} disabled={!isSignedIn} />

      <Link href="/(auth)/sign-in">
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Sign In</Text>
      </Link>

      <Link href="/(protected)">
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Home</Text>
      </Link>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
});

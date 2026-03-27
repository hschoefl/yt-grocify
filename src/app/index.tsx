import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Index = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Screen</Text>
      <Link href="/(auth)/sign-in">
        <Text style={{ color: "blue", marginTop: 20 }}>Go to Sign In</Text>
      </Link>
    </View>
  );
};

export default Index;

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

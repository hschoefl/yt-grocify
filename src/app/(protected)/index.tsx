import React from "react";
import { StyleSheet, Text, View } from "react-native";

// only users that are authenticated can see this screen

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HomeScreen</Text>
      <Text>Only authenticated users can see this screen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

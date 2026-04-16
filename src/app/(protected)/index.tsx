import React from "react";
import { Text, View } from "react-native";

// only users that are authenticated can see this screen

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Text>Only authenticated users can see this screen</Text>
    </View>
  );
};

export default HomeScreen;

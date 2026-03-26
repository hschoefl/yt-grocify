import CustomTextInput from "@/components/CustomTextInput";
import { StatusBar } from "expo-status-bar";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

export default function Index() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Sign in</Text>

      <CustomTextInput
        placeholder="Email"
        autoFocus
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        autoCorrect={false}
        // style={{ backgroundColor: "red" }}
      />

      <CustomTextInput placeholder="Password" secureTextEntry />

      <Pressable
        onPress={() => {
          console.log("Button pressed!");
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#4353fd",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});

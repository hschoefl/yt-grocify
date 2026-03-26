import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type CustomTextInputProps = {
  // hier können spezielle Custom Props stehen, die von den TextInputProps abweichen bzw. nicht vorhanden sind
} & TextInputProps;

const CustomTextInput = (props: CustomTextInputProps) => {
  return <TextInput style={styles.input} {...props} />;
};

export default CustomTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
});

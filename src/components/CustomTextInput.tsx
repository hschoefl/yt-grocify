import React from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type CustomTextInputProps = {
  // hier können spezielle Custom Props stehen, die von den TextInputProps abweichen bzw. nicht vorhanden sind
  control: any; // das control Objekt von useForm, damit wir es in diesem Component verwenden können
  name: string; // der Name des Feldes im Formular
} & TextInputProps;

const CustomTextInput = (props: CustomTextInputProps) => {
  const { control, name, ...rest } = props;
  return (
    <Controller
      control={control}
      name={name}
      // rules={{ required: "This field is required!" }} not reuqired, because we are using zod
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          <TextInput
            {...rest} // hier werden alle anderen Props, die wir an CustomTextInput übergeben, an TextInput weitergegeben
            style={[styles.input, rest.style]}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
          />
          <Text style={styles.errorText}>{error?.message}</Text>
        </View>
      )}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  errorText: {
    color: "crimson",
    marginTop: 5,
  },
});

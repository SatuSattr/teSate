import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  containerStyle?: object;
}

export const Input = ({ containerStyle, ...props }: InputProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 9,
    paddingHorizontal: 15,
    fontFamily: "DMSans_400Regular",
    fontSize: 14,
    backgroundColor: "#FAFAFA",
  },
});

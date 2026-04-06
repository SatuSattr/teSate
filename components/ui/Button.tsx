import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "outline";
}

export const Button = ({
  title,
  variant = "primary",
  style,
  ...props
}: ButtonProps) => {
  const buttonStyles = [
    styles.button,
    variant === "secondary" && styles.secondaryButton,
    variant === "outline" && styles.outlineButton,
    style,
  ];

  const textStyles = [styles.text, variant === "outline" && styles.outlineText];

  return (
    <TouchableOpacity style={buttonStyles} activeOpacity={0.8} {...props}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5CB85C",
    height: 44,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "#418A41",
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#5CB85C",
    elevation: 0,
    shadowOpacity: 0,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
  },
  outlineText: {
    color: "#5CB85C",
  },
});

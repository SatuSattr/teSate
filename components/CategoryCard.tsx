import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CategoryCardProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const CategoryCard = ({ label, isActive, onPress }: CategoryCardProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isActive ? styles.activeContainer : styles.inactiveContainer]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, isActive ? styles.activeLabel : styles.inactiveLabel]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 19,
    paddingVertical: 8,
    borderRadius: 11,
    marginRight: 15,
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.5)",
  },
  activeContainer: {
    backgroundColor: "#5CB85C",
    borderColor: "#5CB85C",
  },
  inactiveContainer: {
    backgroundColor: "rgba(92, 184, 92, 0.25)",
  },
  label: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    letterSpacing: 1,
  },
  activeLabel: {
    color: "#FFFFFF",
  },
  inactiveLabel: {
    color: "#000000",
  },
});

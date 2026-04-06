import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InformationCardProps {
  title: string;
  date: string;
  description: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
}

export const InformationCard = ({
  title,
  date,
  description,
  iconName = "notifications-outline",
  onPress,
}: InformationCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={24} color="#5CB85C" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.3)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(92, 184, 92, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    flex: 1,
    marginRight: 10,
  },
  date: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
  },
  description: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
    opacity: 0.6,
    lineHeight: 20,
  },
});

import { Image } from "expo-image";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const tabs = [
  {
    name: "index",
    label: "Home",
    icon: require("../../assets/icons/tabs/home.svg"),
    route: "/(tabs)/",
  },
  {
    name: "information",
    label: "Information",
    icon: require("../../assets/icons/tabs/information.svg"),
    route: "/(tabs)/information",
  },
  {
    name: "cart",
    label: "Cart",
    icon: require("../../assets/icons/tabs/shopping_cart.svg"),
    route: "/(tabs)/cart",
    isFloating: true,
  },
  {
    name: "notification",
    label: "Notification",
    icon: require("../../assets/icons/tabs/notification.svg"),
    route: "/(tabs)/notification",
  },
  {
    name: "profile",
    label: "Profile",
    icon: require("../../assets/icons/tabs/account.svg"),
    route: "/(tabs)/profile",
  },
];

export const BottomTabs = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          if (tab.isFloating) {
            return (
              <View key={tab.name} style={styles.floatingContainer}>
                <TouchableOpacity
                  style={styles.floatingButton}
                  onPress={() => router.push(tab.route)}
                  activeOpacity={0.9}
                >
                  <Image source={tab.icon} style={styles.floatingIcon} />
                </TouchableOpacity>
              </View>
            );
          }

          const isActive = pathname === tab.route;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.tabItem}
              onPress={() => router.push(tab.route)}
              activeOpacity={0.7}
            >
              <Image
                source={tab.icon}
                style={[
                  styles.icon,
                  { tintColor: isActive ? "#5CB85C" : "#B9BCBE" },
                ]}
              />
              <Text
                style={[
                  styles.label,
                  { color: isActive ? "#5CB85C" : "#B9BCBE" },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 100,
    backgroundColor: "transparent",
    justifyContent: "flex-end",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "space-around",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 10,
    fontFamily: "DMSans_500Medium",
    marginTop: 4,
  },
  floatingContainer: {
    width: 70,
    height: 70,
    marginTop: -45,
    alignItems: "center",
    justifyContent: "center",
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#5CB85C",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  floatingIcon: {
    width: 30,
    height: 30,
    tintColor: "#FFFFFF",
  },
});

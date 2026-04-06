import { Tabs } from "expo-router";
import React from "react";
import { BottomTabs } from "../../components/navigation/BottomTabs";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={() => <BottomTabs />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="information" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="notification" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Import factored out tabs
import { OverviewTab } from "../components/admin/OverviewTab";
import { OrdersTab } from "../components/admin/OrdersTab";
import { ProductsTab } from "../components/admin/ProductsTab";

export default function AdminDashboardScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"Overview" | "Pesanan" | "Produk">("Overview");

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Halo, Admin Cak Awih</Text>
          <Text style={styles.subtitle}>Ringkasan bisnis hari ini</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace("/login")} style={styles.logoutBtn}>
          <Ionicons name="log-out" size={24} color="#B00B3F" />
        </TouchableOpacity>
      </View>

      {/* Modern Tab Bar */}
      <View style={styles.tabBar}>
        {(["Overview", "Pesanan", "Produk"] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabBtn, activeTab === tab && styles.tabBtnActive]}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {activeTab === "Overview" && <OverviewTab />}
        {activeTab === "Pesanan" && <OrdersTab />}
        {activeTab === "Produk" && <ProductsTab />}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  greeting: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#666",
    marginTop: 2,
  },
  logoutBtn: {
    width: 44,
    height: 44,
    backgroundColor: "#FFF0F0",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 22,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabBtnActive: {
    borderBottomColor: "#5CB85C",
  },
  tabText: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
    color: "#B2AEAE",
  },
  tabTextActive: {
    color: "#5CB85C",
    fontFamily: "DMSans_700Bold",
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 40,
  },
});

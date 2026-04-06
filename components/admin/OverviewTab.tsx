import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOrder } from "../../context/OrderContext";

export const OverviewTab = () => {
  const { orders } = useOrder();

  // Dynamic Stats
  const stats = {
    revenue: orders.reduce((acc, order) => acc + order.total, 0),
    activeOrders: orders.filter((o) => o.status !== "Selesai").length,
    totalMenu: 24, // Will be updated if ProductsTab state bubbles up, or kept soft-mocked
  };

  const formatPrice = (amount: number) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Ringkasan Hari Ini</Text>
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: "#EDF7ED" }]}>
          <View style={styles.statIconWrapper}>
            <Ionicons name="wallet" size={24} color="#5CB85C" />
          </View>
          <Text style={styles.statLabel}>Pendapatan</Text>
          <Text style={styles.statValue}>{formatPrice(stats.revenue)}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCardSmall, { backgroundColor: "#FFF4E5" }]}>
            <View style={styles.statIconWrapperSmall}>
              <Ionicons name="time" size={20} color="#FF9800" />
            </View>
            <Text style={styles.statLabelSmall}>Pesanan Aktif</Text>
            <Text style={styles.statValueSmall}>{stats.activeOrders}</Text>
          </View>
          
          <View style={[styles.statCardSmall, { backgroundColor: "#E3F2FD" }]}>
            <View style={styles.statIconWrapperSmall}>
              <Ionicons name="cube" size={20} color="#2196F3" />
            </View>
            <Text style={styles.statLabelSmall}>Total Produk</Text>
            <Text style={styles.statValueSmall}>{stats.totalMenu}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pesanan Terbaru</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="receipt-outline" size={48} color="#B2AEAE" />
          <Text style={styles.emptyText}>Belum ada pesanan masuk</Text>
        </View>
      ) : (
        [...orders].reverse().slice(0, 3).map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[styles.statusBadge, order.status === "Selesai" && styles.statusBadgeSuccess]}>
                <Text style={[styles.statusTextBadge, order.status === "Selesai" && styles.statusTextBadgeSuccess]}>
                  {order.status}
                </Text>
              </View>
            </View>
            <Text style={styles.orderName}>{order.items.length} Item(s) • {formatPrice(order.total)}</Text>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginBottom: 15,
  },
  statsContainer: {
    marginBottom: 25,
  },
  statCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  statIconWrapper: {
    width: 48,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#666",
  },
  statValue: {
    fontSize: 28,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 15,
  },
  statCardSmall: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
  },
  statIconWrapperSmall: {
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  statLabelSmall: {
    fontSize: 13,
    fontFamily: "DMSans_500Medium",
    color: "#666",
  },
  statValueSmall: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginTop: 4,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#B2AEAE",
    marginTop: 10,
  },
  orderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#FFF4E5",
    borderRadius: 8,
  },
  statusBadgeSuccess: {
    backgroundColor: "#EDF7ED",
  },
  statusTextBadge: {
    fontSize: 12,
    fontFamily: "DMSans_700Bold",
    color: "#FF9800",
  },
  statusTextBadgeSuccess: {
    color: "#5CB85C",
  },
  orderName: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#666",
  },
});

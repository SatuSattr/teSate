import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useOrder } from "../../context/OrderContext";
import { useToast } from "../../context/ToastContext";

export const OrdersTab = () => {
  const { orders } = useOrder();
  const { showToast } = useToast();

  const formatPrice = (amount: number) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Semua Pesanan</Text>
      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="file-tray-outline" size={48} color="#B2AEAE" />
          <Text style={styles.emptyText}>Daftar pesanan kosong</Text>
        </View>
      ) : (
        [...orders].reverse().map((order) => (
          <TouchableOpacity 
            key={order.id} 
            style={styles.orderCard} 
            activeOpacity={0.7} 
            onPress={() => showToast({ message: "Buka detail pesanan", type: "info" })}
          >
            <View style={styles.orderHeader}>
              <Text style={styles.orderId}>{order.id}</Text>
              <View style={[styles.statusBadge, order.status === "Selesai" && styles.statusBadgeSuccess]}>
                <Text style={[styles.statusTextBadge, order.status === "Selesai" && styles.statusTextBadgeSuccess]}>
                  {order.status}
                </Text>
              </View>
            </View>
            <Text style={styles.orderName} numberOfLines={1}>
              {order.items.map(i => i.name).join(", ")}
            </Text>
            <View style={styles.orderFooter}>
              <Text style={styles.orderTotal}>{formatPrice(order.total)}</Text>
              <Ionicons name="chevron-forward" size={18} color="#B2AEAE" />
            </View>
          </TouchableOpacity>
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
  orderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F1F1F1",
  },
  orderTotal: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
});

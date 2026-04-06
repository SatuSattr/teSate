import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrder } from "../../context/OrderContext";

export default function WaitingOrderScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getOrderById } = useOrder();

  const order = getOrderById(id as string);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.replace("/(tabs)")}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text style={styles.errorText}>Pesanan tidak ditemukan.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const formatPrice = (amount: number) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)/notification")}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menunggu Pesanan</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Status Card */}
        <View style={styles.statusCard}>
          <Image
            source={require("../../assets/icons/tabs/businessman-chained-clock-b 1.png")}
            style={styles.clockImage}
            contentFit="contain"
          />
          <View style={styles.statusHeader}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
          <Text style={styles.orderId}>Order ID: {order.id}</Text>
          <Text style={styles.estimate}>Estimasi Waktu Antar 30-35 mins</Text>
        </View>

        {/* Order Details (Identical to Payment summary) */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Detail Pesanan</Text>

          {order.items.map((item, index) => (
            <View key={`${item.id}-${index}`} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemQty}>{item.quantity} porsi</Text>
              </View>
              <Text style={styles.itemPrice}>
                {formatPrice(item.price * item.quantity)}
              </Text>
            </View>
          ))}

          <View style={styles.priceDetailRow}>
            <Text style={styles.detailLabel}>Biaya Aplikasi</Text>
            <Text style={styles.detailValue}>{formatPrice(order.appFee)}</Text>
          </View>

          <View style={styles.priceDetailRow}>
            <Text style={styles.detailLabel}>Biaya Pengiriman</Text>
            <Text style={styles.detailValue}>
              {formatPrice(order.deliveryFee)}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabelText}>Total Pembayaran</Text>
            <Text style={styles.totalAmountText}>
              {formatPrice(order.total)}
            </Text>
          </View>

          <View style={[styles.priceDetailRow, { marginTop: 15 }]}>
            <Text style={styles.detailLabel}>Metode Pembayaran</Text>
            <Text style={[styles.detailValue, { textTransform: "capitalize" }]}>
              {order.paymentMethod}
            </Text>
          </View>
        </View>
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
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#B2AEAE",
  },
  scrollContent: {
    paddingHorizontal: 23,
    paddingTop: 20,
    paddingBottom: 40,
  },
  statusCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  clockImage: {
    width: 120,
    height: 120,
    marginBottom: 12,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#5CB85C",
    marginRight: 8,
  },
  statusText: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
  orderId: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
    marginBottom: 5,
  },
  estimate: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#000000",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#000000",
  },
  itemQty: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
    marginTop: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  priceDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#666",
  },
  detailValue: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#000000",
  },
  divider: {
    height: 1,
    backgroundColor: "#F1f1f1",
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabelText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  totalAmountText: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
});

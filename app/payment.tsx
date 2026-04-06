import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useCart, CartItemType } from "../context/CartContext";
import { useToast } from "../context/ToastContext";
import { useOrder } from "../context/OrderContext";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

interface PaymentMethodType {
  id: string;
  label?: string;
  icon: any;
  isWide: boolean;
}

const PAYMENT_METHODS: PaymentMethodType[] = [
  {
    id: "gopay",
    icon: require("../assets/icons/payment/gopay.png"),
    isWide: true,
  },
  {
    id: "ovo",
    icon: require("../assets/icons/payment/ovo.png"),
    isWide: true,
  },
  {
    id: "shopeepay",
    icon: require("../assets/icons/payment/spay.png"),
    isWide: true,
  },
  {
    id: "qris",
    icon: require("../assets/icons/payment/qris.png"),
    isWide: true,
  },
  {
    id: "cash",
    label: "Cash on delivery (COD)",
    icon: require("../assets/icons/payment/cash.png"),
    isWide: false,
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedMethodId, setSelectedMethodId] = useState<string>("gopay");
  const [isExpanded, setIsExpanded] = useState(false);

  const { cart, totalPrice: cartTotalPrice, clearChecked } = useCart();
  const { showToast } = useToast();
  const { addOrder } = useOrder();
  
  const isFromCart = params.isFromCart === "true";

  const productName = (params.name as string) || "Sate Ayam Madura";
  const quantity = parseInt(params.quantity as string) || 1;
  const pricePerItem = parseInt(params.price as string) || 25000;

  const subtotal = pricePerItem * quantity;
  const appFee = 2000;
  const deliveryFee = 5000;
  
  const subtotalToUse = isFromCart ? cartTotalPrice : subtotal;
  const total = subtotalToUse + appFee + deliveryFee;

  const formatPrice = (amount: number) => {
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const selectedMethod =
    PAYMENT_METHODS.find((m) => m.id === selectedMethodId) ||
    PAYMENT_METHODS[0];

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={28} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Pembayaran</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order Summary Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Ringkasan Pesanan</Text>

          {isFromCart ? (
            cart.filter((i: CartItemType) => i.isChecked).map((item: CartItemType) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemQty}>{item.quantity} porsi</Text>
                </View>
                <Text style={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{productName}</Text>
                <Text style={styles.itemQty}>{quantity} porsi</Text>
              </View>
              <Text style={styles.itemPrice}>{formatPrice(subtotalToUse)}</Text>
            </View>
          )}

          <View style={styles.priceDetailRow}>
            <Text style={styles.detailLabel}>Biaya Aplikasi</Text>
            <Text style={styles.detailValue}>{formatPrice(appFee)}</Text>
          </View>

          <View style={styles.priceDetailRow}>
            <Text style={styles.detailLabel}>Biaya Pengiriman</Text>
            <Text style={styles.detailValue}>{formatPrice(deliveryFee)}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabelText}>Total Pembayaran</Text>
            <Text style={styles.totalAmountText}>{formatPrice(total)}</Text>
          </View>
        </View>

        {/* Payment Method Selector */}
        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>

          <TouchableOpacity
            style={[styles.selector, isExpanded && styles.selectorActive]}
            onPress={() => setIsExpanded(!isExpanded)}
            activeOpacity={0.7}
          >
            <View style={styles.selectorContent}>
              <View style={styles.selectedIconContainer}>
                <Image
                  source={selectedMethod.icon}
                  style={[
                    selectedMethod.isWide ? styles.wideIcon : styles.squareIcon,
                    {
                      tintColor:
                        selectedMethod.id === "cash" ? "#2E2E2E" : undefined,
                    },
                  ]}
                  contentFit="contain"
                />
                {selectedMethod.label && (
                  <Text style={styles.selectedLabel}>
                    {selectedMethod.label}
                  </Text>
                )}
              </View>
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={20}
                color="#5CB85C"
              />
            </View>
          </TouchableOpacity>

          {isExpanded && (
            <View style={styles.dropdownContainer}>
              {PAYMENT_METHODS.map((method) => (
                <TouchableOpacity
                  key={method.id}
                  style={[
                    styles.methodItem,
                    selectedMethodId === method.id && styles.activeMethodItem,
                  ]}
                  onPress={() => {
                    setSelectedMethodId(method.id);
                    setIsExpanded(false);
                  }}
                >
                  <View style={styles.methodItemContent}>
                    <Image
                      source={method.icon}
                      style={[
                        method.isWide
                          ? styles.methodWideIcon
                          : styles.methodSquareIcon,
                        {
                          tintColor:
                            method.id === "cash" ? "#2E2E2E" : undefined,
                        },
                      ]}
                      contentFit="contain"
                    />
                    {method.label && (
                      <Text style={styles.methodLabelText}>{method.label}</Text>
                    )}
                  </View>
                  {selectedMethodId === method.id && (
                    <Ionicons
                      name="checkmark-circle"
                      size={20}
                      color="#5CB85C"
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Promo Code Section (Optional visual filler for pro look) */}
        <View style={styles.promoSection}>
          <View style={styles.promoInput}>
            <Ionicons name="pricetag-outline" size={20} color="#B2AEAE" />
            <Text style={styles.promoPlaceholder}>
              Punya kode promo? Masukin sini!
            </Text>
          </View>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Bottom Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.9}
          onPress={() => {
            const orderItems = isFromCart 
              ? cart.filter(i => i.isChecked).map(i => ({
                  id: i.productId.toString(),
                  name: i.name,
                  price: i.price,
                  quantity: i.quantity
                }))
              : [{
                  id: params.id as string || "1",
                  name: productName,
                  price: pricePerItem,
                  quantity: quantity
                }];

            const orderId = addOrder({
              items: orderItems,
              subtotal: subtotalToUse,
              appFee,
              deliveryFee,
              total,
              paymentMethod: selectedMethod.id
            });

            if (!orderId) {
              showToast({
                message: "Maksimal 2 pesanan aktif. Harap tunggu pesanan Anda selesai.",
                type: "error"
              });
              return;
            }

            if (isFromCart) {
              clearChecked();
            }

            showToast({
              message: "Yay! Pesanan kamu sedang diproses.",
              type: "success"
            });
            setTimeout(() => {
              router.replace(`/waiting-order/${orderId}`);
            }, 1000);
          }}
        >
          <Text style={styles.confirmText}>Bayar Sekarang</Text>
        </TouchableOpacity>
      </View>
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
  scrollContent: {
    paddingHorizontal: 23,
    paddingTop: 20,
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
    marginBottom: 25,
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
  paymentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginBottom: 12,
    marginLeft: 5,
  },
  selector: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 60,
    justifyContent: "center",
  },
  selectorActive: {
    borderColor: "#5CB85C",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  selectorContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  wideIcon: {
    width: 80,
    height: 30,
  },
  squareIcon: {
    width: 30,
    height: 30,
  },
  selectedLabel: {
    fontSize: 15,
    fontFamily: "DMSans_500Medium",
    color: "#2E2E2E",
    marginLeft: 12,
  },
  dropdownContainer: {
    backgroundColor: "#FFFFFF",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#EAEAEA",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  methodItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
  },
  activeMethodItem: {
    backgroundColor: "rgba(92, 184, 92, 0.03)",
  },
  methodItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  methodWideIcon: {
    width: 90,
    height: 30,
  },
  methodSquareIcon: {
    width: 25,
    height: 25,
  },
  methodLabelText: {
    fontSize: 14,
    fontFamily: "DMSans_500Medium",
    color: "#2E2E2E",
    marginLeft: 12,
  },
  promoSection: {
    marginTop: 10,
  },
  promoInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    borderStyle: "dashed",
  },
  promoPlaceholder: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
    marginLeft: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
  },
  confirmButton: {
    backgroundColor: "#5CB85C",
    height: 55,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmText: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
  },
});

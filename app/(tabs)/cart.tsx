import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CartItem } from "../../components/CartItem";
import { Button } from "../../components/ui/Button";
import { useCart } from "../../context/CartContext";
import { useRouter } from "expo-router";

export default function CartScreen() {
  const router = useRouter();
  const {
    cart,
    updateQuantity,
    toggleCheck,
    toggleAll,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();

  const isCartEmpty = cart.length === 0;
  const allChecked = cart.length > 0 && cart.every((item) => item.isChecked);

  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  if (isCartEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Keranjang</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="cart-outline" size={80} color="#B2AEAE" />
          <Text style={styles.emptyText}>Keranjang kamu masih kosong!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keranjang</Text>
      </View>

      <View style={styles.selectAllContainer}>
        <TouchableOpacity
          style={styles.checkboxWrapper}
          onPress={() => toggleAll(!allChecked)}
          activeOpacity={0.7}
        >
          <View style={[styles.checkbox, allChecked && styles.checkboxChecked]}>
            {allChecked && (
              <Ionicons name="checkmark" size={16} color="#FFFFFF" />
            )}
          </View>
          <Text style={styles.selectAllText}>Pilih Semua</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onUpdateQuantity={updateQuantity}
            onToggleCheck={toggleCheck}
            onRemove={removeFromCart}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Harga</Text>
          <Text style={styles.totalPrice}>{formatPrice(totalPrice)}</Text>
        </View>
        <Button
          title={`Beli (${totalItems})`}
          onPress={() => {
            router.push({
              pathname: "/payment",
              params: {
                isFromCart: "true"
              }
            });
          }}
          style={styles.checkoutBtn}
          disabled={totalItems === 0}
        />
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
    paddingHorizontal: 23,
    paddingVertical: 20,
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    textAlign: "center",
  },
  selectAllContainer: {
    paddingHorizontal: 23,
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#5CB85C",
    borderColor: "#5CB85C",
  },
  selectAllText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#000000",
    marginLeft: 12,
  },
  listContent: {
    paddingHorizontal: 23,
    paddingTop: 15,
    paddingBottom: 250,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "DMSans_500Medium",
    color: "#B2AEAE",
    marginTop: 16,
  },
  footer: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    backgroundColor: "#ffffffff",
    paddingHorizontal: 23,
    paddingVertical: 20,
    paddingBottom: 40,
    flexDirection: "row",
    alignItems: "center",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 20,
  },
  totalContainer: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
  },
  totalPrice: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  checkoutBtn: {
    width: 140,
  },
});

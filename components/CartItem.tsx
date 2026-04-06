import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { CartItemType } from "../context/CartContext";

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, delta: number) => void;
  onToggleCheck: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onToggleCheck, onRemove }: CartItemProps) => {
  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.checkboxContainer} 
        onPress={() => onToggleCheck(item.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, item.isChecked && styles.checkboxChecked]}>
          {item.isChecked && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
        </View>
      </TouchableOpacity>

      <Image source={item.image} style={styles.image} contentFit="cover" />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title} numberOfLines={2}>{item.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>{formatPrice(item.price)}</Text>
        
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => onUpdateQuantity(item.id, -1)}
          >
            <Ionicons name="remove" size={16} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.qtyBtn} 
            onPress={() => onUpdateQuantity(item.id, 1)}
          >
            <Ionicons name="add" size={16} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 12,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.3)",
  },
  checkboxContainer: {
    paddingRight: 10,
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
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginRight: 10,
  },
  deleteButton: {
    padding: 4,
  },
  price: {
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    alignSelf: "flex-end",
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  qtyText: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    marginHorizontal: 12,
  },
});

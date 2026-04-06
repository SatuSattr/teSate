import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

interface ProductCardProps {
  id: number;
  image: any;
  title: string;
  description: string;
  location: string;
  price: string;
  rawPrice: number;
  category: "foods" | "beverages";
}

export const ProductCard = ({ id, image, title, description, location, price, rawPrice, category }: ProductCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      productId: id,
      name: title,
      price: rawPrice,
      quantity: 1,
      image: image,
    });
    
    showToast({
      message: `${title} berhasil ditambahkan ke keranjang!`,
      type: 'success'
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: "/product/[id]",
        params: { id, category }
      })}
    >
      <View style={styles.card}>
        <Image source={image} style={styles.image} contentFit="cover" />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
          <View style={styles.footer}>
            <Text style={styles.price}>{price}</Text>
            <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart} activeOpacity={0.7}>
              <Image 
                source={require("../assets/icons/home/shopping_cart_small.svg")} 
                style={styles.cartIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    padding: 10,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.11,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 120,
  },
  infoContainer: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  description: {
    fontSize: 10,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
    marginTop: 2,
  },
  location: {
    fontSize: 10,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
    opacity: 0.7,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  cartButton: {
    backgroundColor: "#5CB85C",
    borderRadius: 5,
    padding: 4,
    width: 32,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  cartIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFFFFF",
  },
});

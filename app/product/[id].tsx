import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../components/ui/Button";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const { width } = Dimensions.get("window");
const BASE_URL = "https://te-sate-api.vercel.app";

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  is_available: boolean;
  rating: number;
  total_sold: number;
  tags: string[];
  description: string;
  image: string;
}

export default function ProductDetailScreen() {
  const { id, category } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const endpoint = category === "beverages" ? "beverages" : "foods";
        const response = await fetch(`${BASE_URL}/api/menu/${endpoint}/${id}`);
        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id, category]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#5CB85C" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text>Produk tidak ditemukan</Text>
        <Button title="Kembali" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Navigation */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          
          <View style={{ flex: 1 }} />

          <TouchableOpacity 
            onPress={() => router.replace({ pathname: "/(tabs)", params: { focusSearch: "true" } })} 
            style={styles.searchButton}
          >
            <Ionicons name="search" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Large Image */}
        <Image source={product.image} style={styles.image} contentFit="cover" />

        <View style={styles.content}>
          {/* Title & Price */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{product.name}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{product.rating}</Text>
                <Text style={styles.soldText}>({product.total_sold} terjual)</Text>
              </View>
            </View>
            <Text style={styles.price}>{formatPrice(product.price)}</Text>
          </View>

          {/* Tags */}
          <View style={styles.tagsContainer}>
            {product.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Jumlah</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity 
                style={styles.qtyButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Ionicons name="remove" size={20} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.qtyText}>{quantity}</Text>
              <TouchableOpacity 
                style={styles.qtyButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color="#000000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Harga</Text>
          <Text style={styles.totalPrice}>{formatPrice(product.price * quantity)}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity 
            style={styles.cartIconBtn}
            onPress={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                image: product.image,
              });
              showToast({
                message: `${quantity} ${product.name} berhasil ditambahkan!`,
                type: 'success'
              });
            }}
            disabled={!product.is_available}
          >
            <Ionicons name="cart-outline" size={24} color="#5CB85C" />
          </TouchableOpacity>
          <Button 
            title="Pesan Sekarang" 
            onPress={() => {
              console.log("Navigating to payment with:", product.name);
              router.push({
                pathname: "/payment",
                params: {
                  name: product.name,
                  quantity: quantity.toString(),
                  price: product.price.toString()
                }
              });
            }}
            disabled={product.is_available === false}
            style={styles.orderBtn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    height: 60,
  },
  backButton: {
    padding: 8,
  },
  searchButton: {
    padding: 8,
  },
  image: {
    width: width,
    height: 300,
  },
  content: {
    padding: 23,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  name: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    marginLeft: 4,
  },
  soldText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#B2AEAE",
    marginLeft: 8,
  },
  price: {
    fontSize: 20,
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
  },
  tag: {
    backgroundColor: "rgba(92, 184, 92, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {
    fontSize: 12,
    fontFamily: "DMSans_500Medium",
    color: "#5CB85C",
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    lineHeight: 22,
    color: "#000000",
    opacity: 0.7,
  },
  quantitySection: {
    marginTop: 25,
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    marginHorizontal: 20,
  },
  footer: {
    paddingHorizontal: 23,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#F5F5F5",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  buttonGroup: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  cartIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#5CB85C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  orderBtn: {
    flex: 1,
  },
});

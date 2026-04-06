import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CategoryCard } from "../../components/CategoryCard";
import { ProductCard } from "../../components/ProductCard";
import { Button } from "../../components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";

const BASE_URL = "https://te-sate-api.vercel.app";

const categories = [
  { id: "1", label: "Rekomendasi", endpoint: "/api/menu" },
  { id: "2", label: "Makanan", endpoint: "/api/menu/foods" },
  { id: "3", label: "Minuman", endpoint: "/api/menu/beverages" },
];

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_resized: string;
  is_available: boolean;
  category?: "foods" | "beverages";
}

export default function Home() {
  const params = useLocalSearchParams();
  const searchInputRef = useRef<TextInput>(null);
  const [activeCategory, setActiveCategory] = useState("1");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (price: number) => {
    return `Rp ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const fetchProducts = useCallback(async (endpoint: string, query?: string) => {
    if (!refreshing) setLoading(true);
    setError(null);
    try {
      let url = `${BASE_URL}${endpoint}`;
      if (query) {
        url = `${BASE_URL}/api/menu/search?q=${query}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        let results: Product[] = [];
        if (query) {
          results = [
            ...(data.results?.foods || []).map((p: any) => ({ ...p, category: "foods" })),
            ...(data.results?.beverages || []).map((p: any) => ({ ...p, category: "beverages" })),
          ];
        } else if (endpoint === "/api/menu") {
          results = [
            ...(data.data?.foods || []).map((p: any) => ({ ...p, category: "foods" })),
            ...(data.data?.beverages || []).map((p: any) => ({ ...p, category: "beverages" })),
          ];
        } else {
          const type = endpoint.includes("beverages") ? "beverages" : "foods";
          results = (Array.isArray(data.data) ? data.data : []).map((p: any) => ({
            ...p,
            category: type,
          }));
        }
        setProducts(results);
      } else {
        throw new Error(data.message || "Gagal mengambil data");
      }
    } catch (err: any) {
      console.error("Error fetching products:", err);
      setError("Gagal terhubung ke server. Pastikan koneksi internet kamu stabil.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const category = categories.find((cat) => cat.id === activeCategory);
    if (category) {
      fetchProducts(search.length > 2 ? "" : category.endpoint, search.length > 2 ? search : undefined);
    }
  }, [activeCategory, search, fetchProducts]);

  useEffect(() => {
    if (search.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        fetchProducts("", search);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      const category = categories.find((cat) => cat.id === activeCategory);
      if (category) {
        fetchProducts(category.endpoint);
      }
    }
  }, [activeCategory, search, fetchProducts]);

  // Handle auto-focus when returning from detail screen
  useEffect(() => {
    if (params.focusSearch === "true") {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [params.focusSearch]);

  const renderContent = () => {
    if (loading && !refreshing) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#5CB85C" />
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.centerContainer}>
          <Ionicons name="cloud-offline-outline" size={64} color="#B2AEAE" />
          <Text style={styles.errorText}>{error}</Text>
          <Button 
            title="Coba Lagi" 
            onPress={onRefresh} 
            style={{ width: 150, marginTop: 20 }}
          />
        </View>
      );
    }

    return (
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <ProductCard
            id={item.id}
            title={item.name}
            description={item.description}
            location="Sate Cak Awih"
            price={formatPrice(item.price)}
            rawPrice={item.price}
            image={item.image_resized}
            category={item.category || "foods"}
          />
        )}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#5CB85C"]} />
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Menu tidak ditemukan</Text>
          </View>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header Section */}
      <View style={styles.fixedHeader}>
        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="#5CB85C" />
          <Text style={styles.location}>Bambu Apus, Jakarta Timur</Text>
        </View>

        <View style={styles.header}>
          <Text style={styles.greeting}>Sore, Mang Saswi</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            ref={searchInputRef}
            style={styles.searchInput}
            placeholder="Cari Kesukaan kamu!"
            placeholderTextColor="#B2AEAE"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.categoriesWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesContent}>
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                label={cat.label}
                isActive={activeCategory === cat.id}
                onPress={() => {
                  setActiveCategory(cat.id);
                  setSearch("");
                }}
              />
            ))}
          </ScrollView>
        </View>
      </View>

      {renderContent()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  fixedHeader: {
    backgroundColor: "#FFFFFF",
    paddingBottom: 10,
    zIndex: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 23,
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
    marginLeft: 4,
  },
  header: {
    paddingHorizontal: 23,
    marginTop: 15,
  },
  greeting: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  searchContainer: {
    paddingHorizontal: 23,
    marginTop: 12,
  },
  searchInput: {
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    paddingHorizontal: 19,
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.5)",
    shadowColor: "rgba(185, 188, 190, 0.5)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoriesWrapper: {
    marginTop: 12,
  },
  categoriesContent: {
    paddingHorizontal: 23,
  },
  productGrid: {
    paddingHorizontal: 13,
    marginTop: 15,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.7,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "DMSans_500Medium",
    color: "#B2AEAE",
  },
});

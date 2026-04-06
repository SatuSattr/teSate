import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import { useToast } from "../../context/ToastContext";

const BASE_URL = "https://te-sate-api.vercel.app";

export const ProductsTab = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/menu`);
      const data = await res.json();

      if (data.success) {
        setProducts([
          ...(data.data?.foods || []).map((p: any) => ({
            ...p,
            category: "foods",
          })),
          ...(data.data?.beverages || []).map((p: any) => ({
            ...p,
            category: "beverages",
          })),
          ...(data.data?.snacks || []).map((p: any) => ({
            ...p,
            category: "snacks",
          })),
        ]);
      }
    } catch (e) {
      console.error(e);
      showToast({ message: "Gagal mengambil data produk.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (amount: number) => {
    if (!amount) return "Rp 0";
    return `Rp ${amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const handleAddProduct = () => {
    if (!form.name || !form.price || !form.stock) {
      showToast({ message: "Harap isi semua kolom!", type: "error" });
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name,
      price: parseInt(form.price, 10) || 0,
      is_available: parseInt(form.stock, 10) > 0,
      category: "foods", // For mock purposes
      image: null,
    };

    setProducts([newProduct, ...products]);
    setForm({ name: "", price: "", stock: "" });
    setIsFormVisible(false);
    showToast({ message: "Produk berhasil ditambahkan Lokal!", type: "success" });
  };

  return (
    <View style={styles.tabContent}>
      <View style={styles.rowBetween}>
        <Text style={styles.sectionTitle}>Katalog Produk</Text>
        <TouchableOpacity
          style={styles.addBtn}
          activeOpacity={0.7}
          onPress={() => setIsFormVisible(true)}
        >
          <Ionicons name="add" size={20} color="#FFFFFF" />
          <Text style={styles.addBtnText}>Tambah</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5CB85C"
          style={{ marginTop: 20 }}
        />
      ) : products.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20, color: "#666" }}>
          Produk kosong.
        </Text>
      ) : (
        products.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.productCard}>
            {item.image_resized || item.image ? (
              <Image
                source={{ uri: item.image_resized || item.image }}
                style={styles.productImage}
                contentFit="cover"
              />
            ) : (
              <View style={styles.productIconWrapper}>
                <Ionicons
                  name={item.category === "beverages" ? "cafe" : "fast-food"}
                  size={24}
                  color="#5CB85C"
                />
              </View>
            )}
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>
                {formatPrice(item.price)} • Stok:{" "}
                {item.is_available ? "Ada" : "Habis"}
              </Text>
            </View>
            <View style={styles.productActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="pencil" size={18} color="#2196F3" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="trash" size={18} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}

      {/* Modal Add Product */}
      <Modal visible={isFormVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tambah Produk Baru</Text>
              <TouchableOpacity onPress={() => setIsFormVisible(false)}>
                <Ionicons name="close" size={24} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nama Produk"
                placeholderTextColor="#B2AEAE"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Harga Produk"
                placeholderTextColor="#B2AEAE"
                keyboardType="numeric"
                value={form.price}
                onChangeText={(text) => setForm({ ...form, price: text })}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Stok"
                placeholderTextColor="#B2AEAE"
                keyboardType="numeric"
                value={form.stock}
                onChangeText={(text) => setForm({ ...form, stock: text })}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleAddProduct} activeOpacity={0.8}>
              <Text style={styles.submitBtnText}>Masukin Menu!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E2E2E",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addBtnText: {
    fontSize: 13,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
    marginLeft: 4,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
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
  productIconWrapper: {
    width: 50,
    height: 50,
    backgroundColor: "#EDF7ED",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
  },
  productInfo: {
    flex: 1,
    marginLeft: 12,
  },
  productName: {
    fontSize: 15,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  productPrice: {
    fontSize: 13,
    fontFamily: "DMSans_400Regular",
    color: "#666",
    marginTop: 4,
  },
  productActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    backgroundColor: "#F8F9FA",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 22,
    paddingBottom: 40,
    gap: 15,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  inputWrapper: {
    height: 45,
    backgroundColor: "#FFFFFF",
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.5)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
  },
  submitBtn: {
    height: 48,
    backgroundColor: "#5CB85C",
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  submitBtnText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
  },
});

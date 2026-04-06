import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InformationCard } from "../../components/InformationCard";
import { useOrder } from "../../context/OrderContext";

export default function NotificationScreen() {
  const { orders } = useOrder();
  const router = useRouter();

  const isOrdersEmpty = orders.length === 0;

  if (isOrdersEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notifikasi</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons
            name="notifications-off-outline"
            size={80}
            color="#B2AEAE"
          />
          <Text style={styles.emptyText}>Tidak ada pesanan aktif</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Menunggu":
        return "time-outline";
      case "Diproses":
        return "restaurant-outline";
      case "Diantar":
        return "bicycle-outline";
      case "Selesai":
        return "checkmark-done-outline";
      default:
        return "notifications-outline";
    }
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} - ${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InformationCard
            title={`Order ${item.id}`}
            date={formatDate(item.createdAt)}
            description={`Status: ${item.status}\nTotal: Rp ${item.total
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`}
            iconName={
              getStatusIcon(item.status) as keyof typeof Ionicons.glyphMap
            }
            onPress={() => router.push(`/waiting-order/${item.id}` as any)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 23,
    paddingBottom: 40,
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
});

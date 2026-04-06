import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { InformationCard } from "../../components/InformationCard";

const dummyInforamtions = [
  {
    id: "1",
    title: "Sate Madura 20% OFF!",
    date: "20 Feb 2026",
    description:
      "Nikmati potongan harga spesial untuk sate madura khusus minggu ini di seluruh outlet TeSate!",
    iconName: "pricetag-outline" as const,
  },
  {
    id: "2",
    title: "Cabang Jakarta Selatan",
    date: "19 Feb 2026",
    description:
      "Kunjungi cabang baru kami di Jakarta Selatan mulai besok! Dapatkan promo menarik untuk 100 pembeli pertama.",
    iconName: "location-outline" as const,
  },
  {
    id: "3",
    title: "Menu Baru: Sate Maranggi",
    date: "15 Feb 2026",
    description:
      "Sate Maranggi dengan bumbu rempah khas kini sudah tersedia. Buruan cobain menu terbaru kami!",
    iconName: "restaurant-outline" as const,
  },
];

export default function InformationScreen() {
  const isInformationEmpty = dummyInforamtions.length === 0;

  if (isInformationEmpty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={80} color="#B2AEAE" />
          <Text style={styles.emptyText}>belum ada informasi bang!</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Informations</Text>
      </View>
      <FlatList
        data={dummyInforamtions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InformationCard
            title={item.title}
            date={item.date}
            description={item.description}
            iconName={item.iconName}
            onPress={() => console.log("Information Pressed", item.id)}
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
    paddingTop: 25,
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

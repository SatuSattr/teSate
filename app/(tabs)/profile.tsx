import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    // Navigate to index/login
    router.dismissAll();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      {/* Top Background Area */}
      <View style={styles.headerBackground}>
        <Image
          source={require("../../assets/icons/tabs/sate_art.jpg")}
          style={styles.headerImageOverlay}
          contentFit="cover"
        />
        <SafeAreaView edges={["top"]} style={styles.headerContent}>
          <Text style={styles.headerTitle}>Profile</Text>
        </SafeAreaView>
      </View>

      {/* Main Content Card */}
      <View style={styles.card}>
        <View style={styles.scrollContent}>
          {/* Form Fields */}
          <View style={styles.fieldContainer}>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>Kurniawan</Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>kurniawan@gmail.com</Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>
                Jl. Bambu Apus 3, Jakarta Timur
              </Text>
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputPassword}>***********</Text>
            </View>
          </View>

          {/* Links */}
          <View style={styles.linksContainer}>
            <TouchableOpacity style={styles.linkRow} activeOpacity={0.7}>
              <Text style={styles.linkText}>Kebijakan dan Privasi</Text>
              <Ionicons name="chevron-forward" size={20} color="#454545" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkRow}
              activeOpacity={0.7}
              onPress={() => router.push("/(tabs)/notification")}
            >
              <Text style={styles.linkText}>Riwayat Order</Text>
              <Ionicons name="chevron-forward" size={20} color="#454545" />
            </TouchableOpacity>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.logoutButton}
              activeOpacity={0.8}
              onPress={handleLogout}
            >
              <Text style={styles.logoutButtonText}>Keluar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5CB85C",
  },
  headerBackground: {
    height: 250,
    backgroundColor: "#5CB85C",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerImageOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.3,
  },
  headerContent: {
    alignItems: "center",
    paddingTop: -40,
    marginTop: -45,
    zIndex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
  },
  card: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -80,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  scrollContent: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 110,
    flex: 1,
  },
  fieldContainer: {
    marginBottom: 30,
  },
  inputBox: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(185, 188, 190, 0.5)",
    borderRadius: 11,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 15,
    shadowColor: "#B9BCBE",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
  },
  inputPassword: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#000000",
  },
  linksContainer: {
    marginBottom: 40,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  linkText: {
    fontSize: 16,
    fontFamily: "DMSans_400Regular",
    color: "#454545",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#2E2E2E",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
  },
  logoutButton: {
    flex: 1,
    height: 52,
    backgroundColor: "#B00B3F",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  logoutButtonText: {
    fontSize: 16,
    fontFamily: "DMSans_700Bold",
    color: "#FFFFFF",
  },
});

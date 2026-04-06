import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const { width } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/images/sateh_1.png")}
              style={styles.image}
              contentFit="cover"
            />
          </View>

          {/* Header Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Daftar dulu</Text>
            <Text style={styles.subtitle}>
              Daftarin akun kamu disini, isi yang lengkap ya data yang aku
              minta, jangan sampe ngga!
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Input
              placeholder="Masukkan nama lengkap"
              value={fullName}
              onChangeText={setFullName}
            />

            <Input
              placeholder="Masukkan email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <Input
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Input
              placeholder="Masukkan kembali password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            {/* Buttons */}
            <Button
              title="Daftar!"
              onPress={() => console.log("Register clicked")}
              style={{ marginTop: 10, marginBottom: 24 }}
            />

            <TouchableOpacity
              style={styles.loginContainer}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.loginText}>
                Sudah Punya Akun?{" "}
                <Text style={styles.loginTextBold}>Masuk buru!</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 203,
    height: 147,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    fontFamily: "DMSans_700Bold",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
    fontFamily: "DMSans_400Regular",
    lineHeight: 22,
    opacity: 0.7,
  },
  formContainer: {
    paddingHorizontal: 48,
    marginTop: 30,
  },
  loginContainer: {
    alignItems: "center",
  },
  loginText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
  },
  loginTextBold: {
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
});

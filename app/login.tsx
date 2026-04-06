import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
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

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
            <Text style={styles.title}>Login dulu kali ah</Text>
            <Text style={styles.subtitle}>
              Masuk pake akun kamu yang udah didaftarin ya!
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formContainer}>
            <Input
              placeholder="Masukkan email atau username"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />

            <Input
              placeholder="Masukkan password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {/* Remember Me & Forgot Password */}
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.rememberMeContainer}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
                <Text style={styles.rememberMeText}>Ingatin akunku</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => console.log("Lupa Password")}>
                <Text style={styles.forgotPasswordText}>Lupa password?</Text>
              </TouchableOpacity>
            </View>

            {/* Buttons */}
            <Button
              title="Masuk!"
              onPress={() => router.replace("/(tabs)")}
              style={{ marginBottom: 16 }}
            />

            <Button
              title="Masuk Admin!"
              variant="secondary"
              onPress={() => router.replace("/admin")}
              style={{ marginBottom: 30 }}
            />

            <TouchableOpacity
              style={styles.registerContainer}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.registerText}>
                Belom Punya Akun?{" "}
                <Text style={styles.registerTextBold}>Daptar buru!</Text>
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
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    borderRadius: 4,
    backgroundColor: "#D9D9D9",
    marginRight: 8,
  },
  checkboxChecked: {
    backgroundColor: "#5CB85C",
    borderColor: "#5CB85C",
  },
  rememberMeText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
  },
  forgotPasswordText: {
    fontSize: 14,
    fontFamily: "DMSans_700Bold",
    color: "#275AB9",
  },
  registerContainer: {
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    fontFamily: "DMSans_400Regular",
    color: "#000000",
  },
  registerTextBold: {
    fontFamily: "DMSans_700Bold",
    color: "#5CB85C",
  },
});

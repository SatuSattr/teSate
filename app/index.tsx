import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 2 seconds delay
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar style="dark" />
        <Image
          source={require("../assets/images/sateh_1.png")}
          style={styles.splashLogo}
          contentFit="contain"
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        {/* Main Image */}
        <Image
          source={require("../assets/images/sateh_1.png")}
          style={styles.image}
          contentFit="cover"
        />

        {/* Text Section */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Pet Cepet, Sen</Text>
          <Text style={styles.title}>Pesen!</Text>

          <Text style={styles.description}>
            Pengantaran ke rumah, dan reservasi online untuk sate Cak Awih
          </Text>
        </View>

        {/* Button Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Pesan Sekarang!</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => router.push("/login")}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Sudah Punya Akun? <Text style={styles.loginTextBold}>Masuk</Text>
            </Text>
          </TouchableOpacity>
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
  splashContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  splashLogo: {
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 60,
  },
  image: {
    width: width,
    height: 120,
    marginTop: 40,
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    lineHeight: 40,
    fontFamily: "DMSans_700Bold",
  },
  description: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    marginTop: 20,
    lineHeight: 24,
    opacity: 0.7,
    fontFamily: "DMSans_400Regular",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 60,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#5CB85C",
    width: "100%",
    height: 48,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "DMSans_700Bold",
  },
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "DMSans_400Regular",
  },
  loginTextBold: {
    color: "#5CB85C",
    fontWeight: "700",
    fontFamily: "DMSans_700Bold",
  },
});

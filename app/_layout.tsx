import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LibraryProvider, useLibrary } from "../context/LibraryContext";
import { SettingsProvider } from "../context/SettingsContext";
import { useAppTheme } from "../hooks/useAppTheme";
import Snackbar from "../components/Snackbar";

SplashScreen.preventAutoHideAsync();

function AnimatedSplash() {
  const { colors } = useAppTheme();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.15, duration: 650, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1, duration: 650, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={[styles.splashContainer, { backgroundColor: colors.background }]}>
      <Animated.Image
        source={require("../assets/images/logo.png")}
        style={[styles.splashLogo, { transform: [{ scale }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

function AppShell() {
  const { snackbarVisible, snackbarMessage, hideSnackbar } = useLibrary();

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }} />
      <Snackbar visible={snackbarVisible} message={snackbarMessage} onHide={hideSnackbar} />
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    if (!fontsLoaded) return;

    SplashScreen.hideAsync();

    const timer = setTimeout(() => setAppReady(true), 1200);
    return () => clearTimeout(timer);
  }, [fontsLoaded]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {appReady ? (
          <SettingsProvider>
            <LibraryProvider>
              <AppShell />
            </LibraryProvider>
          </SettingsProvider>
        ) : (
          <AnimatedSplash />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  splashLogo: {
    width: 160,
    height: 90,
  },
});
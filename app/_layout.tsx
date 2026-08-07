import { useEffect } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { LibraryProvider, useLibrary } from "../context/LibraryContext";
import Snackbar from "../components/Snackbar";

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <LibraryProvider>
        <AppShell />
      </LibraryProvider>
    </SafeAreaProvider>
  );
}
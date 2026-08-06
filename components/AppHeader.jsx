import { StyleSheet, Image, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppHeader({ isDarkMode, onToggleDarkMode, onOpenSettings }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
      <View style={styles.logoRow}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        {/*<Text style={styles.logoYt}>YT</Text>
        <Text style={styles.logoMp3}>MP3</Text>*/}
        
      </View>

      <View style={styles.iconsRow}>
        <Pressable
          onPress={onToggleDarkMode}
          hitSlop={10}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressedIcon]}
          accessibilityRole="button"
          accessibilityLabel="Toggle dark mode"
        >
          <Ionicons
            name={isDarkMode ? "moon" : "moon-outline"}
            size={22}
            color="#ffffff"
          />
        </Pressable>

        <Pressable
          onPress={onOpenSettings}
          hitSlop={10}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressedIcon]}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
        >
          <Ionicons name="settings-outline" size={22} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 14,
    backgroundColor: "#111217",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#2d2f36",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    //borderBottomLeftRadius: 35,
    //borderBottomRightRadius: 35,
    elevation: 14,
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 120,
    height: 60,
    resizeMode: "contain",
    //backgroundColor: "white",
  },
  /*logoYt: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1598ff",
  },

  logoMp3: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },*/

  iconsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },

  iconButton: {
    padding: 4,
  },

  pressedIcon: {
    opacity: 0.6,
  },
});
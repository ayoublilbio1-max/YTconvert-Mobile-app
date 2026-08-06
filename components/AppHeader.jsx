import { StyleSheet, Image, View, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

export default function AppHeader({ onOpenSettings }) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.header,
        {
          paddingTop: insets.top + 10,
          backgroundColor: colors.headerBackground,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={styles.logoRow}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
      </View>

      <View style={styles.iconsRow}>
        <Pressable
          onPress={onOpenSettings}
          hitSlop={10}
          style={({ pressed }) => [styles.iconButton, pressed && styles.pressedIcon]}
          accessibilityRole="button"
          accessibilityLabel="Open settings"
        >
          <Ionicons name="settings-outline" size={22} color={colors.text} />
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
    borderBottomWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 14,
  },

  logoRow: { flexDirection: "row", alignItems: "center" },

  logo: { width: 120, height: 60, resizeMode: "contain" },

  iconsRow: { flexDirection: "row", alignItems: "center", gap: 18 },

  iconButton: { padding: 4 },

  pressedIcon: { opacity: 0.6 },
});
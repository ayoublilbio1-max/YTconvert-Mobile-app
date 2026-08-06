import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

const TAB_CONFIG = {
  index: { label: "Home", inactiveIcon: "home-outline", activeIcon: "home" },
  history: { label: "History", inactiveIcon: "time-outline", activeIcon: "time" },
  favorites: { label: "Favorites", inactiveIcon: "star-outline", activeIcon: "star" },
  settings: { label: "Settings", inactiveIcon: "person-outline", activeIcon: "person" },
};

export default function AppFooter({ state, navigation }) {
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.footer,
        {
          paddingBottom: Math.max(insets.bottom, 16),
          backgroundColor: colors.footerBackground,
          borderTopColor: colors.border,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const tab = TAB_CONFIG[route.name];
        if (!tab) return null;

        const isFocused = state.index === index;
        const color = isFocused ? colors.tint : colors.tabInactive;

        const handlePress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const handleLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <Pressable
            key={route.key}
            onPress={handlePress}
            onLongPress={handleLongPress}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={tab.label}
            style={({ pressed }) => [styles.tabButton, pressed && styles.pressedTab]}
          >
            <Ionicons name={isFocused ? tab.activeIcon : tab.inactiveIcon} size={26} color={color} />
            <Text style={[styles.tabLabel, { color }]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 14,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  tabButton: { flex: 1, alignItems: "center", justifyContent: "center", minHeight: 54 },

  pressedTab: { opacity: 0.65 },

  tabLabel: { marginTop: 4, fontSize: 12, lineHeight: 16, fontFamily: "Poppins_400Regular" },
});
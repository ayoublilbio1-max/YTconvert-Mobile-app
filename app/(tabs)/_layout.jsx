import { View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";
import { useAppTheme } from "../../hooks/useAppTheme";

const icons = {
  index: { active: "home", inactive: "home-outline" },
  history: { active: "time", inactive: "time-outline" },
  favorites: { active: "star", inactive: "star-outline" },
  settings: { active: "person", inactive: "person-outline" },
};

export default function TabsLayout() {
  const router = useRouter();
  const { colors } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ zIndex: 1000, elevation: 1000 }}>
        <AppHeader onOpenSettings={() => router.push("/settings")} />
      </View>

      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.tint,
          tabBarInactiveTintColor: colors.tabInactive,
          tabBarStyle: {
            backgroundColor: colors.footerBackground,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            height: 130,
            paddingTop: 8,
            paddingBottom: 8,
            zIndex: 1000,
            elevation: 1000,
          },
          tabBarLabelStyle: { fontSize: 12, fontFamily: "Poppins_400Regular" },
          tabBarIcon: ({ focused, color }) => {
            const currentIcon = icons[route.name] ?? icons.index;
            return (
              <Ionicons
                name={focused ? currentIcon.active : currentIcon.inactive}
                size={26}
                color={color}
              />
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Home" }} />
        <Tabs.Screen name="history" options={{ title: "History" }} />
        <Tabs.Screen name="favorites" options={{ title: "Favorites" }} />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
    </View>
  );
}
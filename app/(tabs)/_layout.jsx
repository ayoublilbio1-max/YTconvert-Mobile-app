import { useState } from "react";
import { View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../../components/AppHeader";

const icons = {
  index: { active: "home", inactive: "home-outline" },
  history: { active: "time", inactive: "time-outline" },
  favorites: { active: "star", inactive: "star-outline" },
  settings: { active: "person", inactive: "person-outline" },
};

export default function TabsLayout() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        onOpenSettings={() => router.push("/settings")}
      />

      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#1498ff",
          tabBarInactiveTintColor: "#92939a",
          tabBarStyle: {
            backgroundColor: "#111217",
            borderTopColor: "#292b31",
            borderTopWidth: 1,
            height: 110,
            paddingTop: 8,
            paddingBottom: 8,
            //borderTopLeftRadius: 35,
            //borderTopRightRadius: 35,
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

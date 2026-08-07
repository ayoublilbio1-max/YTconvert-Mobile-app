import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

const FILTERS = [
  { key: "all", label: "All", icon: null },
  { key: "mp3", label: "MP3", icon: "musical-notes-outline" },
  { key: "mp4", label: "MP4", icon: "videocam-outline" },
];

export default function FormatFilterTabs({ value, onChange }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {FILTERS.map((filter) => {
        const active = value === filter.key;
        return (
          <Pressable
            key={filter.key}
            onPress={() => onChange(filter.key)}
            style={[styles.tab, active && { backgroundColor: colors.tint }]}
          >
            {filter.icon && (
              <Ionicons
                name={filter.icon}
                size={16}
                color={active ? "#ffffff" : colors.tabInactive}
                style={styles.tabIcon}
              />
            )}
            <Text style={[styles.tabText, { color: active ? "#ffffff" : colors.tabInactive }]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 4,
    marginBottom: 18,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  tabIcon: {
    marginRight: 2,
  },
  tabText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
});
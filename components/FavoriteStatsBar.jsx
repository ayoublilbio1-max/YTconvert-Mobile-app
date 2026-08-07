import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

const STATS = [
  { key: "all", label: "Favorites", icon: "heart" },
  { key: "mp3", label: "MP3", icon: "musical-notes" },
  { key: "mp4", label: "MP4", icon: "videocam" },
];

export default function FavoriteStatsBar({ counts, active, onChange }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.row}>
      {STATS.map((stat) => {
        const isActive = active === stat.key;
        return (
          <Pressable
            key={stat.key}
            onPress={() => onChange(stat.key)}
            style={[
              styles.card,
              {
                backgroundColor: isActive ? colors.tint + "22" : colors.card,
                borderColor: isActive ? colors.tint : colors.border,
              },
            ]}
          >
            <Ionicons name={stat.icon} size={18} color={colors.tint} />
            <Text style={[styles.count, { color: colors.text }]}>{counts[stat.key]}</Text>
            <Text style={[styles.label, { color: colors.tabInactive }]}>{stat.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginBottom: 16 },
  card: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
    gap: 4,
  },
  count: { fontSize: 16, fontFamily: "Poppins_700Bold" },
  label: { fontSize: 11, fontFamily: "Poppins_400Regular" },
});
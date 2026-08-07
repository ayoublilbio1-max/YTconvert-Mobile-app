import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

export default function MediaListItem({ item, isFavorite, onToggleFavorite, onPressMore }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.thumbnailWrapper}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <View style={styles.playOverlay}>
          <Ionicons name="play" size={16} color="#ffffff" />
        </View>
      </View>

      <View style={styles.infoColumn}>
        <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.metaRow}>
          <View style={[styles.formatBadge, { borderColor: colors.tint }]}>
            <Text style={[styles.formatBadgeText, { color: colors.tint }]}>
              {item.format.toUpperCase()}
            </Text>
          </View>
          <Text style={[styles.metaText, { color: colors.tabInactive }]}>{item.sizeLabel}</Text>
          <Text style={[styles.metaText, { color: colors.tabInactive }]}>{item.durationLabel}</Text>
        </View>
      </View>

      <View style={styles.actionsColumn}>
        <Pressable
          onPress={onToggleFavorite}
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={22}
            color={isFavorite ? colors.tint : colors.tabInactive}
          />
        </Pressable>

        <Pressable onPress={onPressMore} hitSlop={10} style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={18} color={colors.tabInactive} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    gap: 12,
  },
  thumbnailWrapper: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
    gap: 8,
  },
  itemTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 19,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  formatBadge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  formatBadgeText: {
    fontSize: 10,
    fontFamily: "Poppins_700Bold",
  },
  metaText: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  actionsColumn: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  moreButton: {
    marginTop: 8,
  },
});
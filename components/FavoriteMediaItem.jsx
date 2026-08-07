import { useRef } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

export default function FavoriteMediaItem({
  item,
  selected,
  selectionMode,
  onPress,
  onLongPress,
  onSwipeRemove,
  onSwipeShare,
}) {
  const { colors } = useAppTheme();
  const swipeableRef = useRef(null);

  const renderRightActions = () => (
    <View style={styles.actionsRow}>
      <Pressable
        onPress={() => {
          swipeableRef.current?.close();
          onSwipeRemove();
        }}
        style={[styles.actionButton, { backgroundColor: colors.border }]}
      >
        <Ionicons name="trash-outline" size={20} color={colors.text} />
        <Text style={[styles.actionText, { color: colors.text }]}>Remove</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          swipeableRef.current?.close();
          onSwipeShare();
        }}
        style={[styles.actionButton, { backgroundColor: colors.tint }]}
      >
        <Ionicons name="share-outline" size={20} color="#fff" />
        <Text style={[styles.actionText, { color: "#fff" }]}>Share</Text>
      </Pressable>
    </View>
  );

  return (
    <Swipeable ref={swipeableRef} renderRightActions={renderRightActions} enabled={!selectionMode}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={[
          styles.card,
          { backgroundColor: colors.card, borderColor: selected ? colors.tint : colors.border },
        ]}
      >
        <View style={styles.thumbnailWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
          <View style={styles.playOverlay}>
            <Ionicons name="play" size={16} color="#ffffff" />
          </View>
          <View style={[styles.savedBadge, { backgroundColor: colors.tint }]}>
            <Ionicons name="checkmark" size={10} color="#fff" />
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

        {selectionMode ? (
          <Ionicons
            name={selected ? "checkbox" : "square-outline"}
            size={24}
            color={selected ? colors.tint : colors.tabInactive}
          />
        ) : (
          <Ionicons name="heart" size={22} color={colors.tint} />
        )}
      </Pressable>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    borderWidth: 1,
    padding: 10,
    gap: 12,
  },
  thumbnailWrapper: { width: 80, height: 80, borderRadius: 12, overflow: "hidden" },
  thumbnail: { width: "100%", height: "100%" },
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
  savedBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  infoColumn: { flex: 1, gap: 8 },
  itemTitle: { fontSize: 14, fontFamily: "Poppins_600SemiBold", lineHeight: 19 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  formatBadge: { borderWidth: 1, borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  formatBadgeText: { fontSize: 10, fontFamily: "Poppins_700Bold" },
  metaText: { fontSize: 11, fontFamily: "Poppins_400Regular" },
  actionsRow: { flexDirection: "row", height: "100%" },
  actionButton: {
    width: 76,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    borderRadius: 16,
    marginLeft: 8,
  },
  actionText: { fontSize: 11, fontFamily: "Poppins_600SemiBold" },
});
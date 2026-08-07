import { useMemo, useState } from "react";
import { FlatList, Pressable, Share, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useLibrary } from "../../context/LibraryContext";
import FavoriteStatsBar from "../../components/FavoriteStatsBar";
import SearchSortBar from "../../components/SearchSortBar";
import FavoriteMediaItem from "../../components/FavoriteMediaItem";

export default function FavoritesScreen() {
  const { colors } = useAppTheme();
  const { favorites, removeFromFavorites, removeManyFromFavorites, showSnackbar } = useLibrary();

  const [activeStat, setActiveStat] = useState("all");
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("recent");
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);

  const counts = useMemo(
    () => ({
      all: favorites.length,
      mp3: favorites.filter((i) => i.format === "mp3").length,
      mp4: favorites.filter((i) => i.format === "mp4").length,
    }),
    [favorites]
  );

  const visibleItems = useMemo(() => {
    let items = favorites;

    if (activeStat !== "all") {
      items = items.filter((i) => i.format === activeStat);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((i) => i.title.toLowerCase().includes(q));
    }

    const sorted = [...items];
    if (sortKey === "az") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortKey === "size") {
      sorted.sort((a, b) => (b.sizeMB ?? 0) - (a.sizeMB ?? 0));
    } else if (sortKey === "duration") {
      sorted.sort((a, b) => (b.durationSeconds ?? 0) - (a.durationSeconds ?? 0));
    }
    // "recent" keeps favorites' natural order (newest-added first)

    return sorted;
  }, [favorites, activeStat, query, sortKey]);

  const toggleSelected = (id) => {
    setSelectedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      if (next.length === 0) setSelectionMode(false);
      return next;
    });
  };

  const handleLongPress = (id) => {
    setSelectionMode(true);
    setSelectedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const handleShareItem = async (item) => {
    try {
      await Share.share({ message: `${item.title}\n${item.url}` });
    } catch (e) {
      // user cancelled or share failed — no action needed
    }
  };

  const handleBulkShare = async () => {
    const items = favorites.filter((f) => selectedIds.includes(f.id));
    const message = items.map((i) => `${i.title}\n${i.url}`).join("\n\n");
    try {
      await Share.share({ message });
    } catch (e) {}
  };

  const handleBulkRemove = () => {
    showSnackbar(`Removed ${selectedIds.length} item(s) from Favorites`);
    removeManyFromFavorites(selectedIds);
    setSelectedIds([]);
    setSelectionMode(false);
  };

  const handleBulkDelete = () => {
    showSnackbar("Deleting files will be available once downloads are supported");
  };

  const exitSelection = () => {
    setSelectedIds([]);
    setSelectionMode(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.content}
        data={visibleItems}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <View style={[styles.iconWrapper, { backgroundColor: colors.tint + "22" }]}>
                <Ionicons name="star" size={22} color={colors.tint} />
              </View>
              <Text style={[styles.title, { color: colors.text }]}>Favorites</Text>
            </View>
            <Text style={[styles.description, { color: colors.tabInactive }]}>
              Your favorite downloads are saved permanently.
            </Text>

            <SearchSortBar query={query} onQueryChange={setQuery} sortKey={sortKey} onSortChange={setSortKey} />
            <FavoriteStatsBar counts={counts} active={activeStat} onChange={setActiveStat} />
          </>
        }
        renderItem={({ item }) => (
          <FavoriteMediaItem
            item={item}
            selected={selectedIds.includes(item.id)}
            selectionMode={selectionMode}
            onPress={() => (selectionMode ? toggleSelected(item.id) : null)}
            onLongPress={() => handleLongPress(item.id)}
            onSwipeRemove={() => {
              removeFromFavorites(item.id);
              showSnackbar("Removed from Favorites");
            }}
            onSwipeShare={() => handleShareItem(item)}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={
          <Text style={[styles.emptyText, { color: colors.tabInactive }]}>
            No favorites yet — tap the heart on any item to save it here.
          </Text>
        }
      />

      {selectionMode && (
        <View style={[styles.selectionBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable onPress={exitSelection} style={styles.selectionInfo}>
            <Ionicons name="checkbox" size={18} color={colors.tint} />
            <View>
              <Text style={[styles.selectionCount, { color: colors.text }]}>{selectedIds.length} selected</Text>
              <Text style={[styles.selectionHint, { color: colors.tabInactive }]}>Tap item to deselect</Text>
            </View>
          </Pressable>

          <View style={styles.selectionActions}>
            <Pressable onPress={handleBulkDelete} style={styles.selectionAction}>
              <Ionicons name="trash-outline" size={18} color={colors.danger} />
              <Text style={[styles.selectionActionText, { color: colors.danger }]}>Delete</Text>
            </Pressable>
            <Pressable onPress={handleBulkShare} style={styles.selectionAction}>
              <Ionicons name="share-outline" size={18} color={colors.tint} />
              <Text style={[styles.selectionActionText, { color: colors.tint }]}>Share</Text>
            </Pressable>
            <Pressable onPress={handleBulkRemove} style={styles.selectionAction}>
              <Ionicons name="heart-dislike-outline" size={18} color={colors.tabInactive} />
              <Text style={[styles.selectionActionText, { color: colors.tabInactive }]}>Remove</Text>
            </Pressable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, zIndex: 1 },
  content: { padding: 16, paddingBottom: 100 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontFamily: "Poppins_700Bold" },
  description: { fontSize: 13, lineHeight: 20, fontFamily: "Poppins_400Regular", marginBottom: 16 },
  emptyText: { fontSize: 13, fontFamily: "Poppins_400Regular", textAlign: "center", marginTop: 40 },
  selectionBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 14,
    zIndex: 1500,
    elevation: 15,
  },
  selectionInfo: { flexDirection: "row", alignItems: "center", gap: 10 },
  selectionCount: { fontSize: 13, fontFamily: "Poppins_600SemiBold" },
  selectionHint: { fontSize: 11, fontFamily: "Poppins_400Regular" },
  selectionActions: { flexDirection: "row", gap: 14 },
  selectionAction: { alignItems: "center", gap: 2 },
  selectionActionText: { fontSize: 10, fontFamily: "Poppins_500Medium" },
});
import { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useLibrary } from "../../context/LibraryContext";
import MediaListItem from "../../components/MediaListItem";
import FormatFilterTabs from "../../components/FormatFilterTabs";

export default function HistoryScreen() {
  const { colors } = useAppTheme();
  const { history, isFavorite, toggleFavorite, showSnackbar } = useLibrary();
  const [filter, setFilter] = useState("all");

  const filteredHistory = useMemo(() => {
    if (filter === "all") return history;
    return history.filter((item) => item.format === filter);
  }, [history, filter]);

  return (
    <FlatList
      style={[styles.list, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      data={filteredHistory}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <View style={styles.headerRow}>
            <View style={[styles.iconWrapper, { backgroundColor: colors.tint + "22" }]}>
              <Ionicons name="time" size={22} color={colors.tint} />
            </View>
            <Text style={[styles.title, { color: colors.text }]}>History</Text>
          </View>

          <Text style={[styles.description, { color: colors.tabInactive }]}>
            Your recently downloaded files. History is cleared automatically when you close the
            app.
          </Text>

          <FormatFilterTabs value={filter} onChange={setFilter} />
        </>
      }
      renderItem={({ item }) => (
        <MediaListItem
          item={item}
          isFavorite={isFavorite(item.id)}
          onToggleFavorite={() => {
            const nowFavorite = toggleFavorite(item);
            showSnackbar(nowFavorite ? "Saved to Favorites" : "Removed from Favorites");
          }}
        />
      )}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={
        <Text style={[styles.emptyText, { color: colors.tabInactive }]}>
          Nothing here yet — convert a video to see it in your history.
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, zIndex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 10 },
  iconWrapper: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontFamily: "Poppins_700Bold" },
  description: { fontSize: 13, lineHeight: 20, fontFamily: "Poppins_400Regular", marginBottom: 18 },
  emptyText: { fontSize: 13, fontFamily: "Poppins_400Regular", textAlign: "center", marginTop: 40 },
});
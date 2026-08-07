import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

const SORT_OPTIONS = [
  { key: "recent", label: "Recent", icon: "time-outline" },
  { key: "az", label: "A → Z", icon: "text-outline" },
  { key: "size", label: "Largest Size", icon: "document-outline" },
  { key: "duration", label: "Duration", icon: "time-outline" },
];

export default function SearchSortBar({ query, onQueryChange, sortKey, onSortChange }) {
  const { colors } = useAppTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const activeSort = SORT_OPTIONS.find((o) => o.key === sortKey) ?? SORT_OPTIONS[0];

  return (
    <View style={styles.row}>
      <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Ionicons name="search" size={16} color={colors.tabInactive} />
        <TextInput
          value={query}
          onChangeText={onQueryChange}
          placeholder="Search favorites..."
          placeholderTextColor={colors.tabInactive}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>

      <Pressable
        onPress={() => setMenuOpen(true)}
        style={[styles.sortButton, { backgroundColor: colors.card, borderColor: colors.border }]}
      >
        <Text style={[styles.sortLabel, { color: colors.text }]}>{activeSort.label}</Text>
        <Ionicons name="chevron-down" size={14} color={colors.tabInactive} />
      </Pressable>

      <Modal visible={menuOpen} transparent animationType="fade" onRequestClose={() => setMenuOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setMenuOpen(false)}>
          <View style={[styles.menu, { backgroundColor: colors.card, borderColor: colors.border }]}>
            {SORT_OPTIONS.map((option) => (
              <Pressable
                key={option.key}
                onPress={() => {
                  onSortChange(option.key);
                  setMenuOpen(false);
                }}
                style={styles.menuItem}
              >
                <Ionicons name={option.icon} size={16} color={colors.tabInactive} />
                <Text style={[styles.menuText, { color: colors.text }]}>{option.label}</Text>
                {sortKey === option.key && (
                  <Ionicons name="checkmark" size={16} color={colors.tint} style={{ marginLeft: "auto" }} />
                )}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginBottom: 16 },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: { flex: 1, fontSize: 13, fontFamily: "Poppins_400Regular", height: "100%" },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    height: 44,
  },
  sortLabel: { fontSize: 13, fontFamily: "Poppins_500Medium" },
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  menu: {
    position: "absolute",
    top: 220,
    right: 16,
    left: 130,
    borderRadius: 14,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 6,
  },
  menuItem: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, paddingHorizontal: 10 },
  menuText: { fontSize: 13, fontFamily: "Poppins_400Regular" },
});
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function OptionPickerModal({ visible, title, options, selectedValue, onSelect, onClose, isPremium }) {
  const { colors } = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>

          {options.map((option) => {
            const locked = option.premium && !isPremium;
            const selected = option.value === selectedValue;

            return (
              <Pressable
                key={option.value}
                onPress={() => onSelect(option, locked)}
                style={[styles.option, { borderBottomColor: colors.border }]}
              >
                <Text style={[styles.optionLabel, { color: locked ? colors.tabInactive : colors.text }]}>
                  {option.label}
                </Text>

                {option.premium && (
                  <View style={[styles.premiumBadge, { backgroundColor: colors.tint }]}>
                    <Text style={styles.premiumBadgeText}>PREMIUM</Text>
                  </View>
                )}

                {selected && !locked && <Ionicons name="checkmark" size={18} color={colors.tint} />}
                {locked && <Ionicons name="lock-closed" size={14} color={colors.tabInactive} />}
              </Pressable>
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { width: "100%", borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, padding: 12 },
  title: { fontSize: 15, fontFamily: "Poppins_600SemiBold", padding: 10, paddingBottom: 14 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionLabel: { flex: 1, fontSize: 14, fontFamily: "Poppins_400Regular" },
  premiumBadge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  premiumBadgeText: { fontSize: 9, fontFamily: "Poppins_700Bold", color: "#fff" },
});
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function ConfirmDialog({ visible, title, message, confirmLabel = "Confirm", danger, onConfirm, onCancel }) {
  const { colors } = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.tabInactive }]}>{message}</Text>

          <View style={styles.actions}>
            <Pressable onPress={onCancel} style={[styles.button, { backgroundColor: colors.border }]}>
              <Text style={[styles.buttonText, { color: colors.text }]}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={onConfirm}
              style={[styles.button, { backgroundColor: danger ? colors.danger : colors.tint }]}
            >
              <Text style={[styles.buttonText, { color: "#fff" }]}>{confirmLabel}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", padding: 24 },
  card: { width: "100%", borderRadius: 18, borderWidth: StyleSheet.hairlineWidth, padding: 20 },
  title: { fontSize: 16, fontFamily: "Poppins_600SemiBold", marginBottom: 8 },
  message: { fontSize: 13, lineHeight: 20, fontFamily: "Poppins_400Regular", marginBottom: 20 },
  actions: { flexDirection: "row", gap: 10 },
  button: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: 12, paddingVertical: 12 },
  buttonText: { fontSize: 14, fontFamily: "Poppins_600SemiBold" },
});
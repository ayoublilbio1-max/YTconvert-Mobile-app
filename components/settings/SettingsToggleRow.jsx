import { StyleSheet, Switch, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function SettingsToggleRow({ icon, label, value, onValueChange, isLast, disabled }) {
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
        disabled && { opacity: 0.5 },
      ]}
    >
      {icon && <Ionicons name={icon} size={19} color={colors.tabInactive} style={styles.icon} />}
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.border, true: colors.tint }}
        thumbColor="#ffffff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 12, paddingHorizontal: 14, gap: 10 },
  icon: { width: 20 },
  label: { flex: 1, fontSize: 14, fontFamily: "Poppins_500Medium" },
});
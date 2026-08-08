import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function SettingsRow({
  icon,
  label,
  value,
  badge,
  danger,
  showChevron = true,
  isLast,
  onPress,
  subtitle,
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.row,
        !isLast && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
      ]}
    >
      {icon && (
        <Ionicons name={icon} size={19} color={danger ? colors.danger : colors.tabInactive} style={styles.icon} />
      )}

      <View style={styles.labelColumn}>
        <Text style={[styles.label, { color: danger ? colors.danger : colors.text }]}>{label}</Text>
        {subtitle && <Text style={[styles.subtitle, { color: colors.tabInactive }]}>{subtitle}</Text>}
      </View>

      {badge && (
        <View style={[styles.badge, { backgroundColor: colors.tint }]}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}

      {value !== undefined && <Text style={[styles.value, { color: colors.tabInactive }]}>{value}</Text>}

      {showChevron && onPress && <Ionicons name="chevron-forward" size={16} color={colors.tabInactive} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 14, gap: 10 },
  icon: { width: 20 },
  labelColumn: { flex: 1 },
  label: { fontSize: 14, fontFamily: "Poppins_500Medium" },
  subtitle: { fontSize: 11, fontFamily: "Poppins_400Regular", marginTop: 2 },
  value: { fontSize: 13, fontFamily: "Poppins_400Regular", marginRight: 2 },
  badge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2, marginRight: 4 },
  badgeText: { fontSize: 9, fontFamily: "Poppins_700Bold", color: "#fff" },
});
import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function SettingsSection({ title, children }) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.wrapper}>
      {title && <Text style={[styles.title, { color: colors.tabInactive }]}>{title}</Text>}
      <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 18 },
  title: {
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: "hidden",
  },
});
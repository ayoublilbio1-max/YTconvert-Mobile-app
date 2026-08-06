import { StyleSheet, Text, View } from "react-native";
import { useAppTheme } from "../hooks/useAppTheme";

export default function TabPage({ title }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 28, fontFamily: "Poppins_700Bold" },
});
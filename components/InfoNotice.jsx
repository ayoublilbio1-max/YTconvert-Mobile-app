import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

export default function InfoNotice() {
  const { colors } = useAppTheme();
  const router = useRouter();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.tint + "22" }]}>
          <Ionicons name="headset" size={20} color={colors.tint} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>YouTube to MP3 Converter</Text>
      </View>

      <Text style={[styles.body, { color: colors.tabInactive }]}>
        YTMP3 lets you convert YouTube videos into MP3 or MP4 files right from your phone. Paste a
        link, pick a format, and download the file directly — no sign-up needed. By using YTMP3,
        you accept our{" "}
        <Text style={[styles.link, { color: colors.tint }]} onPress={() => router.push("/terms")}>
          Terms of Use
        </Text>
        .
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    flexShrink: 1,
  },
  body: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  link: {
    fontFamily: "Poppins_500Medium",
    textDecorationLine: "underline",
  },
});
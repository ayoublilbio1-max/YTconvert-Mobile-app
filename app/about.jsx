import { Text, StyleSheet } from "react-native";
import InfoScreenLayout from "../components/InfoScreenLayout";
import { useAppTheme } from "../hooks/useAppTheme";

export default function AboutScreen() {
  const { colors } = useAppTheme();
  return (
    <InfoScreenLayout title="About YTMP3">
      <Text style={[styles.paragraph, { color: colors.text }]}>
        YTMP3 lets you convert YouTube videos into MP3 or MP4 files, right from your phone —
        paste a link, choose a format, and download.
      </Text>
    </InfoScreenLayout>
  );
}

const styles = StyleSheet.create({
  paragraph: { fontSize: 14, lineHeight: 22, fontFamily: "Poppins_400Regular" },
});
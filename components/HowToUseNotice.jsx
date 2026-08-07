import { View, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

const STEPS = [
  "Choose the download format. You can choose between MP3 and MP4.",
  "Go to YouTube and find a video you would like to download.",
  "Copy the video's link.",
  "Paste the link into our converter above.",
  "Click the Convert button.",
  "The conversion will start. This might take a moment. As soon as the conversion is finished, you can download the converted file.",
];

export default function HowToUseNotice() {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.tint + "22" }]}>
          <Ionicons name="information-circle" size={20} color={colors.tint} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>How to download a YouTube video?</Text>
      </View>

      <View style={styles.stepsList}>
        {STEPS.map((step, index) => (
          <View key={index} style={styles.stepRow}>
            <View style={[styles.stepNumber, { backgroundColor: colors.tint }]}>
              <Text style={styles.stepNumberText}>{index + 1}</Text>
            </View>
            <Text style={[styles.stepText, { color: colors.tabInactive }]}>{step}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.thankYouBox, { backgroundColor: colors.tint + "18" }]}>
        <Ionicons name="heart" size={16} color={colors.tint} />
        <Text style={[styles.thankYouText, { color: colors.text }]}>
          Thank you for using our YouTube to MP3 Converter.
        </Text>
      </View>
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
    marginBottom: 16,
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
  stepsList: {
    gap: 14,
  },
  stepRow: {
    flexDirection: "row",
    gap: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  stepNumberText: {
    color: "#ffffff",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
  },
  stepText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: "Poppins_400Regular",
  },
  thankYouBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 18,
  },
  thankYouText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    flexShrink: 1,
  },
});
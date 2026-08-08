import { useEffect, useRef, useState } from "react";
import { Animated, Linking, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";

// TODO: replace with your real contact info
const CONTACT_EMAIL = "ayoubghart@gmail.com";
const PORTFOLIO_URL = "https://ayoubghart.dev";

export default function ConversionDemoModal({ visible, format, onClose }) {
  const { colors } = useAppTheme();
  const [stage, setStage] = useState("converting"); // "converting" | "demo"
  const progress = useRef(new Animated.Value(0)).current;
  const [progressLabel, setProgressLabel] = useState(0);

  const accentColor = format === "mp4" ? "#7c5cff" : colors.tint;

  useEffect(() => {
    if (!visible) return;

    setStage("converting");
    progress.setValue(0);
    setProgressLabel(0);

    const listenerId = progress.addListener(({ value }) => {
      setProgressLabel(Math.round(value));
    });

    Animated.timing(progress, {
      toValue: 100,
      duration: 2200,
      useNativeDriver: false,
    }).start(() => {
      setStage("demo");
    });

    return () => progress.removeListener(listenerId);
  }, [visible]);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
  });

  const handleEmail = () => {
    Linking.openURL(`mailto:${CONTACT_EMAIL}?subject=YTMP3%20-%20Full%20App%20Inquiry`).catch(() => {});
  };

  const handlePortfolio = () => {
    Linking.openURL(PORTFOLIO_URL).catch(() => {});
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Pressable onPress={onClose} hitSlop={10} style={styles.closeButton}>
            <Ionicons name="close" size={20} color={colors.tabInactive} />
          </Pressable>

          {stage === "converting" ? (
            <>
              <View style={[styles.iconCircle, { backgroundColor: accentColor + "22" }]}>
                <Ionicons
                  name={format === "mp4" ? "videocam" : "musical-notes"}
                  size={26}
                  color={accentColor}
                />
              </View>

              <Text style={[styles.title, { color: colors.text }]}>Converting in progress</Text>
              <Text style={[styles.subtitle, { color: colors.tabInactive }]}>
                Please wait while we convert your file...
              </Text>

              <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
                <Animated.View
                  style={[styles.progressFill, { width: widthInterpolated, backgroundColor: accentColor }]}
                />
              </View>
              <Text style={[styles.progressLabel, { color: colors.tabInactive }]}>{progressLabel}%</Text>
            </>
          ) : (
            <>
              <View style={[styles.iconCircle, { backgroundColor: accentColor + "22" }]}>
                <Ionicons name="information-circle" size={28} color={accentColor} />
              </View>

              <Text style={[styles.title, { color: colors.text }]}>This is a demo build</Text>
              <Text style={[styles.subtitle, { color: colors.tabInactive }]}>
                Your link is valid, but this app doesn&apos;t perform real conversions for now.
              </Text>

              <Text style={[styles.subtitle, { color: colors.tabInactive, marginTop: 6 }]}>
                Want a fully working app like this built for you? Get in touch:
              </Text>

              <Pressable
                onPress={handleEmail}
                style={[styles.contactButton, { backgroundColor: accentColor }]}
              >
                <Ionicons name="mail" size={16} color="#fff" />
                <Text style={styles.contactButtonText}>{CONTACT_EMAIL}</Text>
              </Pressable>

              <Pressable
                onPress={handlePortfolio}
                style={[styles.contactButtonOutline, { borderColor: colors.border }]}
              >
                <Ionicons name="globe-outline" size={16} color={colors.text} />
                <Text style={[styles.contactButtonOutlineText, { color: colors.text }]}>
                  View Portfolio
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 22,
    alignItems: "center",
  },
  closeButton: { position: "absolute", top: 14, right: 14, padding: 4 },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  title: { fontSize: 16, fontFamily: "Poppins_600SemiBold", marginBottom: 6, textAlign: "center" },
  subtitle: {
    fontSize: 13,
    lineHeight: 19,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: 4,
  },
  progressTrack: {
    width: "100%",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 16,
  },
  progressFill: { height: "100%", borderRadius: 4 },
  progressLabel: { fontSize: 12, fontFamily: "Poppins_500Medium", marginTop: 8, alignSelf: "flex-end" },
  contactButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 16,
  },
  contactButtonText: { color: "#fff", fontSize: 13, fontFamily: "Poppins_600SemiBold" },
  contactButtonOutline: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingVertical: 12,
    marginTop: 10,
  },
  contactButtonOutlineText: { fontSize: 13, fontFamily: "Poppins_600SemiBold" },
});
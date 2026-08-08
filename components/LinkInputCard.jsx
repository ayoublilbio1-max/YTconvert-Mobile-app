import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Platform } from "react-native";
import * as Clipboard from "expo-clipboard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../hooks/useAppTheme";
import ConversionDemoModal from "./ConversionDemoModal";

const isValidYouTubeUrl = (value) => {
  const normalized = value.trim().toLowerCase();
  return normalized.includes("youtube.com/") || normalized.includes("youtu.be/");
};

export default function LinkInputCard() {
  const { colors } = useAppTheme();
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [format, setFormat] = useState("mp3"); // "mp3" | "mp4"
  const [modalVisible, setModalVisible] = useState(false);

  const handlePasteFromClipboard = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setUrl(text);
        setError("");
      }
    } catch (e) {
      // clipboard unavailable — fail silently
    }
  };

  const handleToggleFormat = () => {
    setFormat((prev) => (prev === "mp3" ? "mp4" : "mp3"));
    setError("");
  };

  const validate = () => {
    const trimmed = url.trim();
    if (!trimmed) {
      setError("Paste a YouTube link first");
      return false;
    }
    if (!isValidYouTubeUrl(trimmed)) {
      setError("This doesn't look like a valid YouTube link");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      setModalVisible(true);
    }
  };

  const buttonLabel = format === "mp3" ? "Get MP3" : "Get MP4";
  const toggleLabel =
    format === "mp3" ? "Or download as MP4 (video)" : "Or download as MP3 (audio)";

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={[styles.label, { color: colors.text }]}>Paste your YouTube link</Text>

      <View style={styles.row}>
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor: colors.background,
              borderColor: error ? colors.danger : colors.border,
            },
          ]}
        >
          <Pressable
            onPress={handlePasteFromClipboard}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel="Paste from clipboard"
          >
            <Ionicons name="link-outline" size={18} color={colors.tabInactive} style={styles.linkIcon} />
          </Pressable>

          <TextInput
            value={url}
            onChangeText={(text) => {
              setUrl(text);
              if (error) setError("");
            }}
            placeholder="youtube.com/watch?v="
            placeholderTextColor={colors.tabInactive}
            style={[styles.input, { color: colors.text }]}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType={Platform.OS === "ios" ? "url" : "default"}
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.mp3Button,
            { backgroundColor: colors.tint },
            pressed && styles.pressedButton,
          ]}
        >
          <Text style={styles.mp3ButtonText}>{buttonLabel}</Text>
        </Pressable>
      </View>

      {error ? (
        <Text style={[styles.errorText, { color: colors.danger }]}>{error}</Text>
      ) : (
        <Pressable onPress={handleToggleFormat} style={styles.mp4Row}>
          <Text style={[styles.mp4Text, { color: colors.tabInactive }]}>
            {toggleLabel.split(/(MP4 \(video\)|MP3 \(audio\))/).map((part, i) =>
              part === "MP4 (video)" || part === "MP3 (audio)" ? (
                <Text key={i} style={[styles.mp4Link, { color: colors.tint }]}>
                  {part}
                </Text>
              ) : (
                part
              )
            )}
          </Text>
        </Pressable>
      )}

      <ConversionDemoModal
        visible={modalVisible}
        format={format}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 18,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    height: 48,
  },
  linkIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    height: "100%",
  },
  mp3Button: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  pressedButton: {
    opacity: 0.75,
  },
  mp3ButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  errorText: {
    marginTop: 12,
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  mp4Row: {
    marginTop: 14,
    alignItems: "center",
  },
  mp4Text: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  mp4Link: {
    fontFamily: "Poppins_500Medium",
    textDecorationLine: "underline",
  },
});
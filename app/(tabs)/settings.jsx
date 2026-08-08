import { useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useAppTheme } from "../../hooks/useAppTheme";
import { useSettings } from "../../context/SettingsContext";
import { useLibrary } from "../../context/LibraryContext";
import SettingsSection from "../../components/settings/SettingsSection";
import SettingsRow from "../../components/settings/SettingsRow";
import SettingsToggleRow from "../../components/settings/SettingsToggleRow";
import PremiumCard from "../../components/settings/PremiumCard";
import ConfirmDialog from "../../components/settings/ConfirmDialog";
import OptionPickerModal from "../../components/settings/OptionPickerModal";

const AUDIO_OPTIONS = [
  { label: "128 kbps", value: "128" },
  { label: "192 kbps", value: "192" },
  { label: "256 kbps", value: "256" },
  { label: "320 kbps", value: "320" },
];

const VIDEO_OPTIONS = [
  { label: "360p", value: "360" },
  { label: "480p", value: "480" },
  { label: "720p", value: "720" },
  { label: "1080p", value: "1080", premium: true },
];

const LANGUAGE_OPTIONS = [
  { label: "English", value: "English" },
  { label: "Français", value: "Français" },
  { label: "Español", value: "Español" },
  { label: "العربية", value: "العربية" },
];

export default function SettingsScreen() {
  const { colors } = useAppTheme();
  const router = useRouter();
  const { settings, updateSetting } = useSettings();
  const { clearHistory, showSnackbar } = useLibrary();

  const [activePicker, setActivePicker] = useState(null); // "audio" | "video" | "language" | null
  const [confirmClearVisible, setConfirmClearVisible] = useState(false);

  const handleSelectOption = (key, option, locked) => {
    if (locked) {
      showSnackbar("Upgrade to Premium to unlock this option");
      return;
    }
    updateSetting(key, option.value);
    setActivePicker(null);
  };

  const handleContactSupport = () => {
    Linking.openURL("mailto:support@ytmp3.app?subject=YTMP3%20Support").catch(() => {
      showSnackbar("Couldn't open your email app");
    });
  };

  return (
    <>
      <ScrollView
        style={[styles.scroll, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
      >
        <PremiumCard
          isPremium={settings.isPremium}
          onPressUpgrade={() => showSnackbar("Premium plans are coming soon!")}
        />

        <SettingsSection title="App Preferences">
          <SettingsRow
            icon="musical-notes-outline"
            label="Download Quality"
            value={`${settings.audioQuality} kbps`}
            onPress={() => setActivePicker("audio")}
          />
          <SettingsRow
            icon="folder-outline"
            label="Download Location"
            value={settings.downloadLocation === "device" ? "Device" : "Custom"}
            onPress={() =>
              showSnackbar("Custom download folders are coming soon — using device storage for now")
            }
          />
          <SettingsToggleRow
            icon="notifications-outline"
            label="Notifications"
            value={settings.notificationsEnabled}
            onValueChange={(val) => updateSetting("notificationsEnabled", val)}
          />
          <SettingsRow
            icon="globe-outline"
            label="Language"
            value={settings.language}
            isLast
            onPress={() => setActivePicker("language")}
          />
        </SettingsSection>

        <SettingsSection title="Storage & Downloads">
          <SettingsRow
            icon="musical-notes-outline"
            label="Audio Quality"
            value={`${settings.audioQuality} kbps`}
            onPress={() => setActivePicker("audio")}
          />
          <SettingsRow
            icon="videocam-outline"
            label="Video Quality"
            badge={settings.videoQuality === "1080" ? "PREMIUM" : undefined}
            value={`${settings.videoQuality}p`}
            onPress={() => setActivePicker("video")}
          />
          <SettingsRow
            icon="folder-open-outline"
            label="Manage Downloads"
            subtitle="Open downloads folder on your device"
            isLast
            onPress={() => showSnackbar("Manage Downloads will be available once downloads are supported")}
          />

          <View style={[styles.storageBox, { borderTopColor: colors.border }]}>
            <View style={styles.storageColumn}>
              <Text style={[styles.storageLabel, { color: colors.tabInactive }]}>Downloaded files</Text>
              <Text style={[styles.storageValue, { color: colors.tint }]}>1.2 GB</Text>
            </View>
            <View style={[styles.storageDivider, { backgroundColor: colors.border }]} />
            <View style={styles.storageColumn}>
              <Text style={[styles.storageLabel, { color: colors.tabInactive }]}>Available storage</Text>
              <Text style={[styles.storageValue, { color: colors.success }]}>24.8 GB</Text>
            </View>
          </View>

          <SettingsRow
            icon="trash-outline"
            label="Clear History"
            subtitle="Remove items from your History. Your Favorites will not be affected."
            danger
            isLast
            onPress={() => setConfirmClearVisible(true)}
          />
        </SettingsSection>

        <SettingsSection title="Notifications">
          <SettingsToggleRow
            icon="checkmark-done-outline"
            label="Download completed"
            value={settings.notifDownloadCompleted}
            disabled={!settings.notificationsEnabled}
            onValueChange={(val) => updateSetting("notifDownloadCompleted", val)}
          />
          <SettingsToggleRow
            icon="alert-circle-outline"
            label="Download failed"
            value={settings.notifDownloadFailed}
            disabled={!settings.notificationsEnabled}
            onValueChange={(val) => updateSetting("notifDownloadFailed", val)}
          />
          <SettingsToggleRow
            icon="megaphone-outline"
            label="Updates / announcements"
            value={settings.notifUpdates}
            disabled={!settings.notificationsEnabled}
            isLast
            onValueChange={(val) => updateSetting("notifUpdates", val)}
          />
        </SettingsSection>

        <SettingsSection title="Privacy & Legal">
          <SettingsRow icon="shield-outline" label="Privacy Policy" onPress={() => router.push("/privacy")} />
          <SettingsRow icon="document-text-outline" label="Terms of Use" onPress={() => router.push("/terms")} />
          <SettingsRow icon="information-circle-outline" label="About YTMP3" onPress={() => router.push("/about")} />
          <SettingsRow icon="code-slash-outline" label="Open Source Licenses" isLast onPress={() => router.push("/licenses")} />
        </SettingsSection>

        <View style={styles.aboutBlock}>
          <Image source={require("../../assets/images/logo.png")} style={styles.aboutLogo} />
          <Text style={[styles.versionText, { color: colors.tabInactive }]}>Version 1.0.0</Text>
          <Text style={[styles.madeWithText, { color: colors.tabInactive }]}>Made with ❤️ by ayoubghart</Text>
        </View>

        <SettingsSection>
          <SettingsRow
            icon="star-outline"
            label="Rate the app"
            onPress={() => showSnackbar("Thanks for the love! Rating link goes live once the app is published")}
          />
          <SettingsRow icon="headset-outline" label="Contact Support" isLast onPress={handleContactSupport} />
        </SettingsSection>
      </ScrollView>

      <OptionPickerModal
        visible={activePicker === "audio"}
        title="Download Quality"
        options={AUDIO_OPTIONS}
        selectedValue={settings.audioQuality}
        isPremium={settings.isPremium}
        onSelect={(option, locked) => handleSelectOption("audioQuality", option, locked)}
        onClose={() => setActivePicker(null)}
      />

      <OptionPickerModal
        visible={activePicker === "video"}
        title="Video Quality"
        options={VIDEO_OPTIONS}
        selectedValue={settings.videoQuality}
        isPremium={settings.isPremium}
        onSelect={(option, locked) => handleSelectOption("videoQuality", option, locked)}
        onClose={() => setActivePicker(null)}
      />

      <OptionPickerModal
        visible={activePicker === "language"}
        title="Language"
        options={LANGUAGE_OPTIONS}
        selectedValue={settings.language}
        isPremium={settings.isPremium}
        onSelect={(option, locked) => {
          if (option.value !== "English") {
            showSnackbar("More languages are coming soon — using English for now");
            setActivePicker(null);
            return;
          }
          handleSelectOption("language", option, locked);
        }}
        onClose={() => setActivePicker(null)}
      />

      <ConfirmDialog
        visible={confirmClearVisible}
        title="Clear History?"
        message="This will remove all items from your History. Your Favorites will not be affected. This can't be undone."
        confirmLabel="Clear History"
        danger
        onCancel={() => setConfirmClearVisible(false)}
        onConfirm={() => {
          clearHistory();
          setConfirmClearVisible(false);
          showSnackbar("History cleared");
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, zIndex: 1 },
  content: { padding: 16, paddingBottom: 40 },
  storageBox: {
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingVertical: 16,
    paddingHorizontal: 14,
  },
  storageColumn: { flex: 1, alignItems: "center", gap: 4 },
  storageDivider: { width: StyleSheet.hairlineWidth, marginVertical: 2 },
  storageLabel: { fontSize: 11, fontFamily: "Poppins_400Regular" },
  storageValue: { fontSize: 18, fontFamily: "Poppins_700Bold" },
  aboutBlock: { alignItems: "center", marginVertical: 18, gap: 4 },
  aboutLogo: { width: 100, height: 50, resizeMode: "contain" },
  versionText: { fontSize: 12, fontFamily: "Poppins_400Regular" },
  madeWithText: { fontSize: 12, fontFamily: "Poppins_400Regular" },
});
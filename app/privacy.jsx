import { Text, StyleSheet } from "react-native";
import InfoScreenLayout from "../components/InfoScreenLayout";
import { useAppTheme } from "../hooks/useAppTheme";

export default function PrivacyScreen() {
  const { colors } = useAppTheme();
  return (
    <InfoScreenLayout title="Privacy Policy">
      <Text style={[styles.paragraph, { color: colors.text }]}>
        Replace this placeholder with your actual Privacy Policy before publishing — cover what
        data the app collects (if any), how download history/favorites are stored on-device, and
        whether any analytics or third-party services are used.
      </Text>
    </InfoScreenLayout>
  );
}

const styles = StyleSheet.create({
  paragraph: { fontSize: 14, lineHeight: 22, fontFamily: "Poppins_400Regular" },
});
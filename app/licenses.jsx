import { Text, StyleSheet } from "react-native";
import InfoScreenLayout from "../components/InfoScreenLayout";
import { useAppTheme } from "../hooks/useAppTheme";

export default function LicensesScreen() {
  const { colors } = useAppTheme();
  return (
    <InfoScreenLayout title="Open Source Licenses">
      <Text style={[styles.paragraph, { color: colors.text }]}>
        This app is built with Expo, React Native, and several open-source packages. A full
        generated list of licenses will go here.
      </Text>
    </InfoScreenLayout>
  );
}

const styles = StyleSheet.create({
  paragraph: { fontSize: 14, lineHeight: 22, fontFamily: "Poppins_400Regular" },
});
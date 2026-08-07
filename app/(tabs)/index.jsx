import { ScrollView, StyleSheet } from "react-native";
import LinkInputCard from "../../components/LinkInputCard";
import InfoNotice from "../../components/InfoNotice";
import HowToUseNotice from "../../components/HowToUseNotice";
import { useAppTheme } from "../../hooks/useAppTheme";

export default function HomeScreen() {
  const { colors } = useAppTheme();

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <LinkInputCard />
      <InfoNotice />
      <HowToUseNotice />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    zIndex: 1,
  },
  content: {
    paddingBottom: 40,
  },
});
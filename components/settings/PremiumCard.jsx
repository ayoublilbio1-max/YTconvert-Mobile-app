import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppTheme } from "../../hooks/useAppTheme";

const FREE_BENEFITS = ["Ad-free experience", "Faster downloads", "Unlimited downloads", "Higher quality options"];

export default function PremiumCard({ isPremium, onPressUpgrade }) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.card, { backgroundColor: colors.tint + "14", borderColor: colors.tint + "55" }]}>
      <View style={styles.headerRow}>
        <View style={[styles.iconWrapper, { backgroundColor: colors.tint }]}>
          <Ionicons name={isPremium ? "star" : "diamond"} size={22} color="#ffffff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={[styles.planTitle, { color: colors.text }]}>
            {isPremium ? "Premium Member" : "Free Plan"}
          </Text>
          <Pressable onPress={onPressUpgrade} style={styles.upgradeRow}>
            <Text style={[styles.upgradeText, { color: colors.tint }]}>
              {isPremium ? "Manage Subscription" : "Upgrade to Premium"}
            </Text>
            <Ionicons name="arrow-forward" size={14} color={colors.tint} />
          </Pressable>
        </View>

        <Ionicons name="ribbon" size={40} color={colors.tint + "55"} />
      </View>

      {!isPremium && (
        <View style={styles.benefitsGrid}>
          {FREE_BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefitItem}>
              <Ionicons name="checkmark-circle" size={16} color={colors.tint} />
              <Text style={[styles.benefitText, { color: colors.text }]}>{benefit}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 18 },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrapper: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center" },
  planTitle: { fontSize: 17, fontFamily: "Poppins_700Bold" },
  upgradeRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 2 },
  upgradeText: { fontSize: 13, fontFamily: "Poppins_600SemiBold" },
  benefitsGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 14, gap: 10 },
  benefitItem: { flexDirection: "row", alignItems: "center", gap: 6, width: "47%" },
  benefitText: { fontSize: 12, fontFamily: "Poppins_400Regular", flexShrink: 1 },
});
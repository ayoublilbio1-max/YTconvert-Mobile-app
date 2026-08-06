import { StyleSheet, Text, View } from "react-native";

export default function TabPage({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f4f4f4",
  },

  title: {
    fontSize: 28,
    //fontFamily: "Poppins_500Medium",
    fontFamily: "Poppins_700Bold",
    color: "#15161a",
  },
});
import { useColorScheme } from "react-native";
import { Colors } from "../constants/theme";

export function useAppTheme() {
  const scheme = useColorScheme() ?? "dark";
  const colors = Colors[scheme] ?? Colors.dark;

  return { scheme, colors, isDark: scheme === "dark" };
}
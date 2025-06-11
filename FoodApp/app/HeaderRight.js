import { Link } from "expo-router";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "../hooks/themeContext";

export default function HeaderRight() {
  const { darkMode, toggleHandle, theme } = useTheme();
  const styles = StyleSheet.create({
    button: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: theme.color,
      borderRadius: 5,
      backgroundColor: theme.buttonBackground
    },
    buttonText: {
      color: theme.color,
      fontSize: 18,
      fontWeight: "bold"
    }
  });
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Link href="/AgregarComida" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ ADD</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity style={styles.button} onPress={toggleHandle}>
        <Text style={styles.buttonText}>{darkMode ? "☀️" : "🌙"}</Text>
      </TouchableOpacity>
    </View>
  );
}

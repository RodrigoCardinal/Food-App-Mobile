import { Stack, Link } from "expo-router";
import { FunctionsProvider } from "../hooks/useFunctions";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemeProvider, useTheme } from "../hooks/themeContext";
import HeaderRight from "./HeaderRight";

function StackCompleto() {
  const { theme } = useTheme();
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: "FoodApp",
          headerStyle: {
            backgroundColor: theme.header
          },
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "semibold",
            color: theme.color
          },
          headerTintColor: theme.color,
          headerRight: () => <HeaderRight />
        }}
      />
      <Stack.Screen
        name="DetailedCard"
        options={{
          title: "Food Details",
          headerStyle: {
            backgroundColor: theme.header
          },
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "semibold",
            color: theme.color
          },
          headerTintColor: theme.color
        }}
      />
      <Stack.Screen
        name="Receipt"
        options={{
          title: "FoodApp Receipt",
          headerStyle: {
            backgroundColor: theme.header
          },
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "semibold",
            color: theme.color
          },
          headerTintColor: theme.color
        }}
      />
      <Stack.Screen
        name="AgregarComida"
        options={{
          title: "Add Food",
          headerStyle: {
            backgroundColor: theme.header
          },
          headerTitleStyle: {
            fontSize: 32,
            fontWeight: "semibold",
            color: theme.color
          },
          headerTintColor: theme.color
        }}
      />
    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <FunctionsProvider>
        <StackCompleto />
      </FunctionsProvider>
    </ThemeProvider>
  );
}

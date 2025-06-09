import { Stack, Link } from "expo-router";
import { FunctionsProvider } from "../hooks/useFunctions";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Layout() {
  return (
    <FunctionsProvider>
      <Stack initialRouteName="index">
        <Stack.Screen
          name="index"
          options={{
            title: "FoodApp",
            headerTitleStyle: {
              fontSize: 32,
              fontWeight: "semibold",
              color: "blue"
            },
            headerRight: () => (
              <Link href="/AgregarComida" asChild>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>+ ADD</Text>
                </TouchableOpacity>
              </Link>
            )
          }}
        />
        <Stack.Screen
          name="DetailedCard"
          options={{
            title: "Food Details",
            headerTitleStyle: {
              fontSize: 32,
              fontWeight: "semibold",
              color: "blue"
            }
          }}
        />
        <Stack.Screen
          name="Receipt"
          options={{
            title: "FoodApp Receipt",
            headerTitleStyle: {
              fontSize: 32,
              fontWeight: "semibold",
              color: "blue"
            }
          }}
        />
        <Stack.Screen
          name="AgregarComida"
          options={{
            title: "Add Food",
            headerTitleStyle: {
              fontSize: 32,
              fontWeight: "semibold",
              color: "blue"
            }
          }}
        />
      </Stack>
    </FunctionsProvider>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "blue",
    borderRadius: 5
  },
  buttonText: {
    color: "blue",
    fontSize: 18,
    fontWeight: "bold"
  }
});

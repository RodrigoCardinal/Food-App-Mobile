import { Stack } from "expo-router";
import { FunctionsProvider } from "../hooks/useFunctions";

export default function Layout() {
  return (
    <FunctionsProvider>
      <Stack>
        <Stack.Screen
          name="AllFoodsPage"
          options={{
            title: "FoodApp",
            headerTitleStyle: {
              fontSize: 24,
              fontWeight: "semibold",
              color: "blue"
            }
          }}
        />
        <Stack.Screen
          name="DetailedCard"
          options={{
            title: "Food Details",
            headerTitleStyle: {
              fontSize: 24,
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
              fontSize: 24,
              fontWeight: "semibold",
              color: "blue"
            }
          }}
        />
      </Stack>
    </FunctionsProvider>
  );
}

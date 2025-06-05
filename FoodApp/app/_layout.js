import { Stack } from "expo-router";

export default function Layout() {
  return (
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
          title: "Detalle de comida",
          headerTitleStyle: {
            fontSize: 24,
            fontWeight: "semibold",
            color: "blue"
          }
        }}
      />
    </Stack>
  );
}

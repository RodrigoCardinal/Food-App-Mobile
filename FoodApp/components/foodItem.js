import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../hooks/themeContext";

function FoodItem({ comida, addOrder, orderCantidad }) {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = StyleSheet.create({
    foodItem: {
      backgroundColor: theme.background,
      borderWidth: 2,
      borderColor: "#d1d1d1",
      borderRadius: 10,
      width: "48%",
      alignItems: "center",
      gap: 8,
      paddingVertical: 16
    },
    foodItemText: {
      color: theme.colorText,
      fontSize: 18,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 2
    },
    foodIcon: {
      fontSize: 100
    },
    noStock: {
      color: "red"
    },
    disabledFoodItem: {
      opacity: 0.5
    }
  });

  return (
    <TouchableOpacity
      style={[styles.foodItem, orderCantidad === 0 && styles.disabledFoodItem]}
      onPress={() => addOrder(comida)}
      onLongPress={() =>
        router.push({
          pathname: "/DetailedCard",
          params: { ...comida }
        })
      }
    >
      <View>
        <Text style={styles.foodIcon}>{comida.img}</Text>
      </View>
      <View>
        <Text style={styles.foodItemText}>{comida.name}</Text>
      </View>
      <View>
        <Text style={[styles.foodItemText, { fontSize: 14 }]}>
          ${comida.price}
        </Text>
      </View>
      <View>
        {orderCantidad === 0 ? (
          <Text style={[styles.foodItemText, styles.noStock, { fontSize: 14 }]}>
            No Stock
          </Text>
        ) : (
          <Text style={[styles.foodItemText, { fontSize: 14 }]}>
            {orderCantidad} left
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default FoodItem;

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Order({
  order,
  index,
  removeOrder,
  removeOneOrder,
  addOrder,
  comida
}) {
  return (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>
        {order.img} x {order.quantity}
      </Text>
      <Text style={styles.orderPrice}>${order.price * order.quantity}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => removeOneOrder(index)}
      >
        <Text style={styles.buttonText}>➖</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          comida.stock - order.quantity === 0 && styles.disabledButton
        ]}
        onPress={() => addOrder(comida)}
        disabled={comida.stock - order.quantity === 0}
      >
        <Text style={styles.buttonText}>➕</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => removeOrder(index)}
      >
        <Text style={styles.buttonText}>❌</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginVertical: 4,
    gap: 8
  },
  orderText: {
    fontSize: 18,
    flex: 1
  },
  orderPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 8
  },
  button: {
    backgroundColor: "#eee",
    borderRadius: 4,
    padding: 6,
    marginHorizontal: 2
  },
  buttonText: {
    fontSize: 18
  },
  disabledButton: {
    opacity: 0.5
  }
});

export default Order;

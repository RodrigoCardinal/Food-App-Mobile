import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailedCard() {
  const comida = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{comida.img}</Text>
      <Text style={styles.name}>{comida.name}</Text>
      <Text style={styles.price}>Precio: ${comida.price}</Text>
      <Text style={styles.stock}>Stock: {comida.stock}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1
  },
  icon: {
    fontSize: 120,
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  price: {
    fontSize: 20,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  stock: {
    fontSize: 18,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  desc: {
    fontSize: 16,
    color: "#666",
    marginTop: 16,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 2
  }
});

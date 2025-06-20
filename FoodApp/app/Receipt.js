import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from "react-native";
import Order from "../components/order";
import { useFunctions } from "../hooks/useFunctions";

import { useRouter } from "expo-router";
import { useTheme } from "../hooks/themeContext";

function Receipt() {
  const {
    orders,
    total,
    addOrder,
    removeOrder,
    removeOneOrder,
    finalizarCompra
  } = useFunctions();

  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    if (orders.length === 0) {
      router.back();
    }
  }, [orders]);

  const handleCompra = async () => {
    await finalizarCompra();
    Alert.alert("Compra finalizada", "Gracias por tu compra, ¡vuelve pronto!", [
      {
        text: "GRACIAS!"
      }
    ]);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center"
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      marginBottom: 16
    },
    orderContainer: {
      width: "100%",
      marginBottom: 16
    },
    footer: {
      width: "100%",
      height: "18%",
      alignItems: "center",
      marginTop: "auto",
      borderTopWidth: 2,
      borderTopColor: theme.border,
      backgroundColor: theme.header,
      paddingBottom: 16
    },
    total: {
      color: theme.colorText,
      fontSize: 20,
      fontWeight: "bold",
      marginVertical: 16
    },
    finalizarBtn: {
      backgroundColor: "blue",
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 32
    },
    finalizarBtnText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center"
    }
  });

  return (
    <View style={styles.container}>
      <ScrollView style={styles.orderContainer}>
        {orders.map((order, index) => (
          <Order
            key={index}
            order={order}
            index={index}
            removeOrder={removeOrder}
            removeOneOrder={removeOneOrder}
            addOrder={addOrder}
            comida={order}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>
        <TouchableOpacity style={styles.finalizarBtn} onPress={handleCompra}>
          <Text style={styles.finalizarBtnText}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Receipt;

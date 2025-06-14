import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useFunctions } from "../hooks/useFunctions";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function DetailedCard() {
  const comida = useLocalSearchParams();
  const { agregarCantidadAJson, eliminarComida } = useFunctions();
  const [cantidadTotal, setCantidadTotal] = useState(
    comida.stock ? parseInt(comida.stock) : 0
  );

  const [cantidad, setCantidad] = useState(1);
  const router = useRouter();

  const handleAgregarCantidad = () => {
    agregarCantidad();
    Alert.alert(
      "Cantidad agregada",
      `Se han agregado ${cantidad} unidades de ${comida.name}.`,
      [
        {
          text: "OK",
          onPress: () => {
            router.back();
          }
        }
      ]
    );
  };

  const handleEliminar = () => {
    eliminarComida(comida.id);
    Alert.alert(
      "Comida eliminada",
      `Se ha eliminado ${comida.name}. de la base de datos.`,
      [
        {
          text: "OK",
          onPress: () => {
            router.back();
          }
        }
      ]
    );
  };

  const agregarCantidad = () => {
    const nuevaCantidad = cantidadTotal + cantidad;
    agregarCantidadAJson(comida.id, nuevaCantidad);
    setCantidadTotal(nuevaCantidad);
  };

  const sumarCantidad = () => {
    const nuevaCantidad = cantidad + 1;
    setCantidad(nuevaCantidad);
  };
  const restarCantidad = () => {
    const nuevaCantidad = cantidad - 1;
    setCantidad(nuevaCantidad);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{comida.img}</Text>
      <Text style={styles.name}>{comida.name}</Text>
      <Text style={styles.price}>Precio: ${comida.price}</Text>
      <Text style={styles.stock}>Stock: {cantidadTotal}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.addRemoveBtn, cantidad === 1 && styles.disabledBtn]}
          onPress={restarCantidad}
          disabled={cantidad === 1}
        >
          <Text style={styles.circleBtnText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.displayCantidad}>{cantidad}</Text>
        <TouchableOpacity style={styles.addRemoveBtn} onPress={sumarCantidad}>
          <Text style={styles.circleBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.agregarAJsonBtn}
        onPress={() => handleAgregarCantidad()}
      >
        <Text style={styles.agregarAJsonText}>Agregar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.eliminarDeJsonBtn}
        onPress={() => handleEliminar()}
      >
        <Text style={styles.eliminarDeJsonText}>Eliminar de BD</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    textTransform: "uppercase",
    letterSpacing: 2
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32
  },
  addRemoveBtn: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2
  },
  disabledBtn: {
    opacity: 0.4
  },
  circleBtnText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333"
  },
  displayCantidad: {
    fontSize: 32,
    fontWeight: "bold",
    marginHorizontal: 16,
    minWidth: 40,
    textAlign: "center"
  },
  agregarAJsonBtn: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 60
  },
  agregarAJsonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  },
  eliminarDeJsonBtn: {
    backgroundColor: "red",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 60,
    marginTop: 30
  },
  eliminarDeJsonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center"
  }
});

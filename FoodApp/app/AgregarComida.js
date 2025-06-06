import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import useFetchData from "../hooks/fetchData";

export default function AgregarComida() {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const router = useRouter();
  const { agregarComidaAJson } = useFetchData();

  const handleAgregar = async () => {
    if (!name || !img || !price || !stock) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
    try {
      await agregarComidaAJson(img, name, parseInt(price), parseInt(stock));
      Alert.alert("Éxito", "Comida agregada correctamente.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } catch (error) {
      Alert.alert("Error", "No se pudo agregar la comida.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Emoji"
        value={img}
        onChangeText={setImg}
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Stock inicial"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleAgregar}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelBtnText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 32,
    alignItems: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 32
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
    marginBottom: 18,
    backgroundColor: "#fafafa",
    color: "#222"
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 60,
    marginTop: 16
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  cancelBtn: {
    marginTop: 16,
    padding: 10
  },
  cancelBtnText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

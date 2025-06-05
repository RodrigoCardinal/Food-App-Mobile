import { ScrollView, StyleSheet, Text, View } from "react-native";
import FoodItem from "../components/foodItem";
import useFetchData from "../hooks/fetchData";
import useFunctions from "../hooks/useFunctions";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

export default function AllFoodsPage() {
  const { comidas, loading, fetchComidas } = useFetchData();
  const { orders } = useFunctions();
  useEffect(() => {
    fetchComidas();
  }, []);

  const total = orders.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={styles.pageContainer}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        style={styles.scrollView}
      >
        <View style={styles.container}>
          {loading ? (
            <Text>Cargando comidas...</Text>
          ) : comidas.length === 0 ? (
            <Text>No hay comidas disponibles</Text>
          ) : (
            comidas.map((comida, idx) => (
              <FoodItem
                key={comida.id || idx}
                comida={comida}
                orderCantidad={comida.stock || 0}
                addOrder={() => {}}
              />
            ))
          )}
        </View>
      </ScrollView>
      <View style={styles.staticView}>
        <Text style={styles.receiptTitle}>Receipt</Text>
        <View style={styles.inlineRow}>
          <Text style={styles.totalText}>Total: ${total}</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.verOrdenBtn}>Ver orden</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  scrollView: {
    flex: 1
  },
  scroll: {
    padding: 16
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4
  },
  staticView: {
    flex: 0.2,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 24
  },
  receiptTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "flex-start"
  },
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: 16
  },
  totalText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 0
  },
  buttonContainer: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    overflow: "hidden"
  },
  verOrdenBtn: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 12,
    paddingHorizontal: 32,
    textAlign: "center"
  }
});

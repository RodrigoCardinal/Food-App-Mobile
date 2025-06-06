import { ScrollView, StyleSheet, Text, View } from "react-native";
import FoodItem from "../components/foodItem";
import useFetchData from "../hooks/fetchData";
import { useFunctions } from "../hooks/useFunctions";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

import { useRouter } from "expo-router";

export default function AllFoodsPage() {
  const { comidas, loading, fetchComidas } = useFetchData();
  const { orders, total, addOrder } = useFunctions();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      fetchComidas();
    }, [])
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
                orderCantidad={
                  comida.stock -
                  (orders.find((element) => element.id === comida.id)
                    ?.quantity ?? 0)
                }
                addOrder={() => addOrder(comida)}
              />
            ))
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total}</Text>
        <TouchableOpacity
          style={[
            styles.buttonContainer,
            { opacity: orders.length === 0 ? 0.5 : 1 }
          ]}
          onPress={() =>
            router.push({
              pathname: "/Receipt",
              params: { orders: JSON.stringify(orders) }
            })
          }
          disabled={orders.length === 0}
        >
          <Text style={styles.verOrdenBtn}>Ver orden</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/AgregarComida")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    top: 16,
    right: 2,
    backgroundColor: "blue",
    width: 50,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  fabText: {
    position: "absolute",
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold"
  },
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
  footer: {
    width: "100%",
    height: "17%",
    alignItems: "center",
    marginTop: "auto",
    borderTopWidth: 2,
    borderTopColor: "#e0e0e0",
    backgroundColor: "#fafafa",
    paddingBottom: 16
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
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 16
  },
  buttonContainer: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    overflow: "hidden"
  },
  verOrdenBtn: {
    backgroundColor: "blue",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 32,

    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

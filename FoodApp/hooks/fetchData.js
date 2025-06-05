import React, { useState } from "react";

function useFetchData() {
  const [comida, setComida] = useState({});
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  var URLngrok = `https://73cb-190-64-49-12.ngrok-free.app`;
  const fetchComidas = async () => {
    try {
      const URL = `${URLngrok}/comidas`;
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error("Error al obtener comidas");
      }
      const data = await res.json();
      setComidas(data);
    } catch (err) {
      console.error("Error al cargar comidas:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnaComida = async (productId) => {
    try {
      const URL = `${URLngrok}/comidas/${productId}`;
      const res = await fetch(URL);
      if (!res.ok) {
        throw new Error("Error al obtener la comida");
      }
      const data = await res.json();
      setComida(data);
    } catch (e) {
      console.error("Error al cargar la comida:", e);
      throw new Error("No se pudo recuperar el objeto");
    }
  };

  const finalizarCompra = () => {
    const updates = orders.map((order) => {
      const comida = comidas.find((c) => c.id === order.id);
      const nuevoStock = comida.stock - order.quantity;

      return fetch(`http://localhost:3000/comidas/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: nuevoStock })
      });
    });

    Promise.all(updates)
      .then(() => {
        fetchComidas();
        setOrders([]);
      })
      .catch((err) => {
        console.error("Error al finalizar compra:", err);
      });
  };

  return {
    comidas,
    comida,
    loading,
    fetchComidas,
    fetchUnaComida,
    finalizarCompra
  };
}

export default useFetchData;

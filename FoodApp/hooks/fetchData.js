import React, { useState } from "react";

function useFetchData() {
  const [comida, setComida] = useState({});
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  var URLngrok = `https://feb4-2800-a4-152a-3000-b4d6-574d-212-4764.ngrok-free.app`;
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

  const agregarCantidadAJson = async (id, cantidad) => {
    try {
      const URL = `${URLngrok}/comidas/${id}`;
      const response = await fetch(URL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: cantidad })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Error al actualizar el stock: ${response.status} ${
            response.statusText
          } - ${errorData.message || ""}`
        );
      }

      console.log("Stock actualizado exitosamente.");
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      throw error;
    }
  };

  const agregarComidaAJson = async (img, name, price, stock) => {
    try {
      if (!(img && name && price && stock)) {
        return;
      }
      const nuevoProducto = {
        img,
        name,
        price: parseFloat(price),
        stock: parseInt(stock)
      };

      const URL = `${URLngrok}/comidas`;
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto)
      });

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {}
        throw new Error(
          `Error al agregar comida: ${response.status} ${
            response.statusText
          } - ${errorData.message || ""}`
        );
      }
    } catch (error) {
      console.error("Hubo un problema con la operación fetch:", error);
      throw error;
    }
  };

  return {
    comidas,
    comida,
    loading,
    fetchComidas,
    fetchUnaComida,
    finalizarCompra,
    agregarCantidadAJson,
    agregarComidaAJson
  };
}

export default useFetchData;

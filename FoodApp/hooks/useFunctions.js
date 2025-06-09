import React, { createContext, useContext, useState } from "react";

const FunctionsContext = createContext();

export function FunctionsProvider({ children }) {
  const [comida, setComida] = useState({});
  const [comidas, setComidas] = useState([]);
  const [loading, setLoading] = useState(true);
  var URLngrok = `https://0724-190-64-49-12.ngrok-free.app`;
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

      return fetch(`${URLngrok}/comidas/${order.id}`, {
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

  const [orders, setOrders] = useState([]);

  const addOrder = (item) => {
    const orderQuantity =
      orders.find((elemento) => elemento.id === item.id)?.quantity ?? 0;
    if (item.stock - orderQuantity > 0) {
      setOrders((prevOrders) => {
        const existingOrderIndex = prevOrders.findIndex(
          (order) => order.id === item.id
        );
        if (existingOrderIndex !== -1) {
          return prevOrders.map((order, index) => {
            if (index === existingOrderIndex) {
              return { ...order, quantity: order.quantity + 1 };
            }
            return order;
          });
        } else {
          return [...prevOrders, { ...item, quantity: 1 }];
        }
      });
    }
  };

  const removeOrder = (index) => {
    const newOrders = [...orders];
    newOrders.splice(index, 1);
    setOrders(newOrders);
  };

  const removeOneOrder = (index) => {
    const newOrders = [...orders];
    const item = newOrders[index];

    if (item.quantity > 1) {
      newOrders[index] = {
        ...item,
        quantity: item.quantity - 1
      };
    } else {
      newOrders.splice(index, 1);
    }
    setOrders(newOrders);
  };

  const total = orders.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <FunctionsContext.Provider
      value={{
        orders,
        addOrder,
        removeOrder,
        removeOneOrder,
        setOrders,
        total,
        comidas,
        comida,
        loading,
        fetchComidas,
        fetchUnaComida,
        finalizarCompra,
        agregarCantidadAJson,
        agregarComidaAJson,
        finalizarCompra
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
}

export function useFunctions() {
  return useContext(FunctionsContext);
}

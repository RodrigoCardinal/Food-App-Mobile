import React, { createContext, useContext, useState } from "react";

const FunctionsContext = createContext();

export function FunctionsProvider({ children }) {
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
        total
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
}

export function useFunctions() {
  return useContext(FunctionsContext);
}

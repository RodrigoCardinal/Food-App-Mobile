import { useState } from "react";

function useFunctions() {
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

  return {
    orders,
    addOrder,
    removeOrder,
    removeOneOrder,
    setOrders
  };
}

export default useFunctions;

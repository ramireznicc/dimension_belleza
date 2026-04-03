import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (producto) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === producto.id);
      if (existing) {
        return prev.map((i) => i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateCantidad = (id, cantidad) => {
    if (cantidad < 1) return removeItem(id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, cantidad } : i));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateCantidad, clearCart, total, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

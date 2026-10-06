import { createContext, useContext, useState } from "react";

// Every cart item is just the product object spread out plus a `qty` field.
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adds the product, or bumps qty by 1 if that product is already in the cart.
  // Quantity is never allowed to go above the product's stock.
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (!existing) {
        return [...prevCart, { ...product, qty: 1 }];
      }

      return prevCart.map((item) =>
        item.id === product.id && item.qty < product.quantity
          ? { ...item, qty: item.qty + 1 }
          : item,
      );
    });
  };

  // changeQty(id, amount) adds or removes one unit. Going below 1 removes the line.
  const changeQty = (id, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty + amount } : item,
        )
        .filter((item) => item.qty > 0),
    );
  };

  const removeItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, changeQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook so any component can read the cart and its functions.
export function useCart() {
  return useContext(CartContext);
}

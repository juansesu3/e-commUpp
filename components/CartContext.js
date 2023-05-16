import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartcontextProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const addProduct = (productId) => {
    setCartProducts((prev) => [...prev, productId]);
  };
  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

import React, { createContext, useContext, useState } from 'react';

interface Item {
  _id: string;
  name: string;
  price: number;
  images: string[];
  quantity?: number;
}

interface CartContextType {
  cart: Item[];
  addToCart: (item: Item) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Item[]>([]);

  const addToCart = (item: Item) => {
    setCart(prevCart => [...prevCart, item]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

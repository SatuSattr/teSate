import React, { createContext, useContext, useState } from 'react';

export interface CartItemType {
  id: string;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  isChecked: boolean;
}

interface CartContextType {
  cart: CartItemType[];
  addToCart: (item: Omit<CartItemType, 'id' | 'isChecked'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleCheck: (id: string) => void;
  toggleAll: (isChecked: boolean) => void;
  clearChecked: () => void;
  totalPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  const addToCart = (item: Omit<CartItemType, 'id' | 'isChecked'>) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === item.productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, { ...item, id: Date.now().toString() + Math.random(), isChecked: true }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const newQuantity = Math.max(1, i.quantity + delta);
          return { ...i, quantity: newQuantity };
        }
        return i;
      })
    );
  };

  const toggleCheck = (id: string) => {
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, isChecked: !i.isChecked } : i))
    );
  };

  const toggleAll = (isChecked: boolean) => {
    setCart((prev) => prev.map((i) => ({ ...i, isChecked })));
  };

  const clearChecked = () => {
    setCart((prev) => prev.filter((i) => !i.isChecked));
  };

  const totalPrice = cart
    .filter((i) => i.isChecked)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  const totalItems = cart
    .filter((i) => i.isChecked)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCheck,
        toggleAll,
        clearChecked,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

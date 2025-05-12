import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../types';

interface CartItem extends Book {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item._id === book._id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item._id === book._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== bookId));
  };

  const updateQuantity = (bookId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(bookId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === bookId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.fiyat * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 
import React, { createContext, useContext, useState } from 'react';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  appFee: number;
  deliveryFee: number;
  total: number;
  paymentMethod: string;
  status: "Menunggu" | "Diproses" | "Diantar" | "Selesai";
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => string | null;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = (orderData: Omit<Order, 'id' | 'status' | 'createdAt'>) => {
    // Only allow max 2 active orders at a time
    const activeOrders = orders.filter(o => o.status !== "Selesai");
    if (activeOrders.length >= 2) {
      return null;
    }

    const newOrder: Order = {
      ...orderData,
      id: "ORD-" + Math.floor(100000 + Math.random() * 900000).toString(),
      status: "Menunggu",
      createdAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

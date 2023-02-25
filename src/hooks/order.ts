import { useState } from "react";
import { Order } from "../models/order";
import { OrderService } from "../services/orderService";

export const useOrders = () => {
  const orderService = new OrderService();
  const [orders, setOrders] = useState<Order[]>(orderService.orders);

  const addOrder = (order: Order) => {
    if (!order.id) order.id = Math.random().toString(36).substr(2, 9);
    orderService.addOrder(order);
    setOrders(orderService.orders);
  };

  const updateOrder = (order: Order) => {
    orderService.updateOrder(order);
    setOrders(orderService.orders);
  };

  const deleteOrder = (id: string) => {
    orderService.deleteOrder(id);
    setOrders(orderService.orders);
  };

  const seedOrders = () => {
    orderService.seedOrders();
    setOrders(orderService.orders);
  };

  return { orders, addOrder, updateOrder, deleteOrder, seedOrders };
};

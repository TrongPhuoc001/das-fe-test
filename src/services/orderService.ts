import { Order } from "../models/order";

export class OrderService {
  orders: Order[] = [];

  constructor() {
    this.orders = this.getOrders();
  }

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  }
  saveOrders(orders: Order[]): void {
    localStorage.setItem("orders", JSON.stringify(orders));
  }
  addOrder(order: Order): void {
    this.orders.push(order);
    this.saveOrders(this.orders);
  }
  updateOrder(order: Order): void {
    const index = this.orders.findIndex((o) => o.id === order.id);
    this.orders[index] = order;
    this.saveOrders(this.orders);
  }
  deleteOrder(id: string): void {
    this.orders = this.orders.filter((o) => o.id !== id);
    this.saveOrders(this.orders);
  }

  seedOrders(): void {
    const orders = Array.from({ length: 40 }).map((_, i) => {
      const random = Math.floor(Math.random() * 15);
      const random2 = Math.floor(Math.random() * 8);
      const randomDate = Array.from(
        { length: 40 },
        () => Math.floor(Math.random() * 27) + 1
      );
      return {
        id: i.toString(),
        customerId: random.toString(),
        employeeId: random2.toString(),
        orderDate: new Date(`2023-02-${randomDate[i]}`),
        shipDate: new Date(),
      };
    });
    this.saveOrders(orders);
    this.orders = orders;
  }
}

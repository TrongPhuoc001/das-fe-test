import { Customer } from "../models/customer";

export class CustomerService {
  customers: Customer[] = [];

  constructor() {
    this.customers = this.getCustomers();
  }

  getCustomers(): Customer[] {
    return JSON.parse(localStorage.getItem("customers") || "[]");
  }

  saveCustomers(customers: Customer[]): void {
    localStorage.setItem("customers", JSON.stringify(customers));
  }

  addCustomer(customer: Customer): void {
    this.customers.push(customer);
    this.saveCustomers(this.customers);
  }
  updateCustomer(customer: Customer): void {
    const index = this.customers.findIndex((c) => c.id === customer.id);
    this.customers[index] = customer;
    this.saveCustomers(this.customers);
  }

  deleteCustomer(id: string): void {
    this.customers = this.customers.filter((c) => c.id !== id);
    this.saveCustomers(this.customers);
  }

  seedCustomers(): void {
    const cities = ["New York", "Los Angeles", "Chicago", "Houston"];
    const customers = Array.from({ length: 15 }).map((_, i) => {
      const random = Math.floor(Math.random() * cities.length);
      return {
        id: i.toString(),
        firstName: `Customer ${i}`,
        lastName: `Last Name ${i}`,
        street: `${i} Main St`,
        city: cities[random],
        state: cities[random].slice(0, 2),
        zipcode: "12345",
        phone: "1234567890",
        email: `custom${i}@gmail.com`,
      };
    });
    this.saveCustomers(customers);
    this.customers = customers;
  }
}

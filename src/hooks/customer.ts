import { useState } from "react";
import { Customer } from "../models/customer";
import { CustomerService } from "../services/customerService";

export const useCustomers = () => {
  const customerService = new CustomerService();
  const [customers, setCustomers] = useState<Customer[]>(
    customerService.customers
  );

  const addCustomer = (customer: Customer) => {
    if (!customer.id) customer.id = Math.random().toString(36).substr(2, 9);
    customerService.addCustomer(customer);
    setCustomers(customerService.customers);
  };

  const updateCustomer = (customer: Customer) => {
    customerService.updateCustomer(customer);
    setCustomers(customerService.customers);
  };

  const deleteCustomer = (id: string) => {
    customerService.deleteCustomer(id);
    setCustomers(customerService.customers);
  };

  const seedCustomers = () => {
    customerService.seedCustomers();
    setCustomers(customerService.customers);
  };

  return {
    customers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    seedCustomers,
  };
};

import { useState } from "react";
import { useCustomers } from "../../hooks/customer";
import { useEmployees } from "../../hooks/employee";
import { useOrders } from "../../hooks/order";
import { Order } from "../../models/order";
import { Table } from "../common/table/table";
import { OrderAmountChart } from "./Chart/OrderAmount";

export const OrderTable = () => {
  const { orders, addOrder, deleteOrder, updateOrder, seedOrders } =
    useOrders();
  const { customers } = useCustomers();
  const { employees } = useEmployees();
  const [currentTab, setCurrentTab] = useState("table");

  return (
    <div className="container">
      {currentTab === "table" ? (
        <Table
          title="Orders"
          fields={[
            { name: "id", exampleData: "1" },
            { name: "customerId", exampleData: customers.map((c) => c.id) },
            { name: "employeeId", exampleData: employees.map((e) => e.id) },
            { name: "orderDate", exampleData: new Date() },
            { name: "shipDate", exampleData: new Date() },
          ]}
          data={orders}
          onCreate={(data: Order) => {
            addOrder(data);
          }}
          onUpdate={(data: Order) => {
            updateOrder(data);
          }}
          onDelete={(id: string) => deleteOrder(id)}
        />
      ) : (
        <OrderAmountChart orders={orders} />
      )}
      <div className="tab-container tab-bottom">
        <div className="tab">
          <input
            type="radio"
            name="customer-tabs"
            id={"table"}
            checked={currentTab === "table"}
            onClick={() => setCurrentTab("table")}
            className="tab-input"
          />
          <label htmlFor={"table"} className="tab-label">
            Table
          </label>
        </div>
        <div className="tab">
          <input
            type="radio"
            name="customer-tabs"
            id={"chart"}
            checked={currentTab === "chart"}
            onClick={() => setCurrentTab("chart")}
            className="tab-input"
          />
          <label htmlFor={"chart"} className="tab-label">
            Chart
          </label>
        </div>
      </div>
      <button className="float-button" onClick={() => seedOrders()}>
        Seed
      </button>
    </div>
  );
};

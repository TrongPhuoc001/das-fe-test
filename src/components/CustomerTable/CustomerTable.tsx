import { useCustomers } from "../../hooks/customer";
import { Table } from "../common/table/table";
import { Customer } from "../../models/customer";
import { useState } from "react";
import { CustomerChart } from "./CustomerChart.tsx/CustomerChart";

export const CustomerTable = () => {
  const { customers, addCustomer, deleteCustomer, updateCustomer } =
    useCustomers();
  const [currentTab, setCurrentTab] = useState("table");
  return (
    <div className="container">
      {currentTab === "table" ? (
        <Table
          title="Customers"
          fields={[
            { name: "id", exampleData: "1" },
            { name: "firstName", exampleData: "John" },
            { name: "lastName", exampleData: "Doe" },
            { name: "street", exampleData: "123 Main St" },
            { name: "city", exampleData: "New York" },
            { name: "state", exampleData: "NY" },
            { name: "zipcode", exampleData: "12345" },
            { name: "phone", exampleData: "1234567890" },
            { name: "email", exampleData: "adb@gmail.com" },
          ]}
          data={customers}
          onCreate={(data: Customer) => {
            addCustomer(data);
          }}
          onUpdate={(data: Customer) => {
            updateCustomer(data);
          }}
          onDelete={(id: string) => deleteCustomer(id)}
          customValidation={(data: Customer) => {
            if (!/^\d+$/.test(data.phone)) return "Phone not valid";
            if (!data.email.includes("@")) return "Email not valid";
            if (!/^\d+$/.test(data.zipcode)) return "Zipcode not valid";
            return "";
          }}
        />
      ) : (
        <CustomerChart customers={customers} />
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
    </div>
  );
};

import React, { useEffect } from "react";
import "./App.css";
import { CustomerTable } from "./components/CustomerTable/CustomerTable";
import { EmployeeTable } from "./components/EmployeeTable/EmployeeTable";
import { OrderTable } from "./components/OrderTable/orderTable";
import { useCustomers } from "./hooks/customer";
import { useEmployees } from "./hooks/employee";
import { useOrders } from "./hooks/order";

const tabs = [
  { id: 1, name: "Customers", component: <CustomerTable /> },
  { id: 2, name: "Employees", component: <EmployeeTable /> },
  { id: 3, name: "Orders", component: <OrderTable /> },
];

function App() {
  const [currentTab, setCurrentTab] = React.useState<number>(1);
  const { customers, seedCustomers } = useCustomers();
  const { employees, seedEmployees } = useEmployees();
  const { orders, seedOrders } = useOrders();

  useEffect(() => {
    if (customers.length === 0) {
      seedCustomers();
    }
    if (employees.length === 0) {
      seedEmployees();
    }
    if (orders.length === 0) {
      seedOrders();
    }
  }, []);
  return (
    <div className="App">
      <div className="tab-container">
        {tabs.map((tab) => (
          <div key={tab.id} className="tab">
            <input
              type="radio"
              name="tabs"
              id={tab.name}
              checked={currentTab === tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className="tab-input"
            />
            <label htmlFor={tab.name} className="tab-label">
              {tab.name}
            </label>
          </div>
        ))}
      </div>
      {tabs.map((tab) => tab.id === currentTab && tab.component)}
    </div>
  );
}

export default App;

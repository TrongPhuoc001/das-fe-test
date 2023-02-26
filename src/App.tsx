import React from "react";
import "./App.css";
import { CustomerTable } from "./components/CustomerTable/CustomerTable";
import { EmployeeTable } from "./components/EmployeeTable/EmployeeTable";
import { OrderTable } from "./components/OrderTable/orderTable";

const tabs = [
  { id: 1, name: "Customers", component: <CustomerTable /> },
  { id: 2, name: "Employees", component: <EmployeeTable /> },
  { id: 3, name: "Orders", component: <OrderTable /> },
];

function App() {
  const [currentTab, setCurrentTab] = React.useState<number>(1);

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

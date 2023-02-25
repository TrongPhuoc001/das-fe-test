import { useEmployees } from "../../hooks/employee";
import { Table } from "../common/table/table";
import { Employee } from "../../models/employee";
import { useState } from "react";
import { PositionDistribution } from "./Chart/PositionDistribution";
export const EmployeeTable = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee } =
    useEmployees();
  const [currentTab, setCurrentTab] = useState("table");
  return (
    <div className="container">
      {currentTab === "table" ? (
        <Table
          title="Employees"
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
            { name: "position", exampleData: "Manager" },
            { name: "hourlyRate", exampleData: "10.00" },
            { name: "dateHired", exampleData: new Date() },
          ]}
          data={employees}
          onCreate={(data: Employee) => {
            addEmployee(data);
          }}
          onUpdate={(data: Employee) => {
            updateEmployee(data);
          }}
          onDelete={(id: string) => deleteEmployee(id)}
          customValidation={(data: Employee) => {
            if (!/@"^[\d-]+$"/.test(data.phone)) return "Phone not valid";
            if (!data.email.includes("@")) return "Email not valid";
            if (!/^\d+$/.test(data.zipcode)) return "Zipcode not valid";
            if (
              !/^[0-9]{1,2}([,.][0-9]{1,2})?$/.test(data.hourlyRate.toString())
            )
              return "Hourly rate much be number";
            return "";
          }}
        />
      ) : (
        <PositionDistribution employees={employees} />
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

import { useState } from "react";
import { Employee } from "../models/employee";
import { EmployeeService } from "../services/employeeService";

export const useEmployees = () => {
  const employeeService = new EmployeeService();
  const [employees, setEmployees] = useState<Employee[]>(
    employeeService.employees
  );

  const addEmployee = (employee: Employee) => {
    if (!employee.id) employee.id = Math.random().toString(36).substr(2, 9);
    employeeService.addEmployee(employee);
    setEmployees(employeeService.employees);
  };

  const updateEmployee = (employee: Employee) => {
    employeeService.updateEmployee(employee);
    setEmployees(employeeService.employees);
  };

  const deleteEmployee = (id: string) => {
    employeeService.deleteEmployee(id);
    setEmployees(employeeService.employees);
  };

  const seedEmployees = () => {
    employeeService.seedEmployees();
    setEmployees(employeeService.employees);
  };

  return {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    seedEmployees,
  };
};

import { Employee } from "../models/employee";

export class EmployeeService {
  employees: Employee[] = this.getEmployees();

  constructor() {
    this.employees = this.getEmployees();
  }

  getEmployees(): Employee[] {
    return JSON.parse(localStorage.getItem("employees") || "[]");
  }
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
    this.saveEmployees(this.employees);
  }
  saveEmployees(employees: Employee[]): void {
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  updateEmployee(employee: Employee): void {
    const index = this.employees.findIndex((e) => e.id === employee.id);
    this.employees[index] = employee;
    this.saveEmployees(this.employees);
  }

  deleteEmployee(id: string): void {
    this.employees = this.employees.filter((e) => e.id !== id);
    this.saveEmployees(this.employees);
  }

  seedEmployees(): void {
    const cities = ["New York", "Los Angeles", "Chicago", "Houston"];
    const positions = ["Manager", "Sales", "Accountant", "Janitor"];
    const hourlyRates = [30, 25, 20, 15];
    const employees = Array.from({ length: 8 }).map((_, i) => {
      const random = Math.floor(Math.random() * cities.length);
      const random2 = Math.floor(Math.random() * positions.length);
      return {
        id: i.toString(),
        firstName: `Employee ${i}`,
        lastName: `Last Name ${i}`,
        street: `${i} Main St`,
        city: cities[random],
        state: cities[random].slice(0, 2),
        zipcode: "12345",
        phone: "1234567890",
        email: `employee${i}@gmail.com`,
        position: positions[random2],
        hourlyRate: hourlyRates[random2],
        dateHired: new Date(),
      };
    });
    this.saveEmployees(employees);
    this.employees = employees;
  }
}

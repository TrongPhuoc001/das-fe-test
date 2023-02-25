import { Customer } from "./customer";

export interface Employee extends Customer {
  position: string;
  hourlyRate: number;
  dateHired: Date;
}

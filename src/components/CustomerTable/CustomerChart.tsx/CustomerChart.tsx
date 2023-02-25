import { Customer } from "../../../models/customer";
import { CityChart } from "./Charts/CityChart";

export const CustomerChart = ({ customers }: { customers: Customer[] }) => {
  return (
    <div>
      <h2>Customers Chart</h2>
      <CityChart customers={customers} />
    </div>
  );
};

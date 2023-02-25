import { Customer } from "../../../../models/customer";
import { BarChart } from "../../../common/chart/BarChart";
export const CityChart = ({ customers }: { customers: Customer[] }) => {
  const customerCount = customers.reduce((acc, curr) => {
    const key = curr.city;
    if (acc[key]) {
      acc[key]++;
    } else {
      acc[key] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });
  const data = Object.entries(customerCount).map(([key, value]) => ({
    x: key,
    y: value,
  }));
  return <BarChart data={data} label="City" xLabel="City" yLabel="Customers" />;
};

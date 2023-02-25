import { useEffect, useState } from "react";
import { Employee } from "../../../models/employee";
import { randomColor } from "../../../utils/utilsfunction";
import { PieChart, PieChartData } from "../../common/chart/PieChart";

export const PositionDistribution = ({
  employees,
}: {
  employees: Employee[];
}) => {
  const [data, setData] = useState<PieChartData[]>([]);
  useEffect(() => {
    const data = employees.reduce((acc, employee) => {
      const position = employee.position;
      const index = acc.findIndex((d) => d.label === position);
      if (index === -1) {
        acc.push({ label: position, value: 1, color: `#${randomColor()}` });
      } else {
        acc[index].value += 1;
      }
      return acc;
    }, [] as PieChartData[]);
    setData(data);
  }, [employees]);
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Position Distribution</h3>
      <PieChart data={data} />
    </div>
  );
};

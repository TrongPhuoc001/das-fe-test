import {
  XAxisLength,
  X0,
  YAxisLength,
  Y0,
} from "../../../constants/chart.constants";
import { randomColor } from "../../../utils/utilsfunction";
import { Bar } from "./bar";
import { Chart } from "./chart";
import "./index.css";

export interface BarChatData {
  x: string;
  y: number;
}

export const BarChart = ({
  data,
  label,
  xLabel = "x",
  yLabel = "y",
}: {
  data: BarChatData[];
  label: string;
  xLabel?: string;
  yLabel?: string;
}) => {
  const dataYMax = data.reduce(
    (currMax, { y }) => Math.max(currMax, y),
    -Infinity
  );
  const barPlotWidth = XAxisLength / data.length;
  return (
    <div className="chart">
      <span className="chart-label">{label}</span>
      <Chart
        width={XAxisLength + 2 * X0}
        height={YAxisLength + 2 * Y0}
        xLabel={xLabel}
        yLabel={yLabel}
        yLabelData={Array.from({ length: dataYMax })}
      >
        {data.map((d, i) => {
          const x = X0 + i * barPlotWidth;

          const yRatio = dataYMax !== 0 ? d.y / dataYMax : 0.5;

          const height = yRatio * YAxisLength;
          const sidePadding = 20;
          return (
            <Bar
              key={i}
              x={x + sidePadding / 2}
              y={-Y0}
              width={
                barPlotWidth - sidePadding * 2 > 200
                  ? 200
                  : barPlotWidth - sidePadding * 2
              }
              height={height}
              fill={`#${randomColor()}`}
              text={d.x}
            />
          );
        })}
      </Chart>
    </div>
  );
};

import "./index.css";
import {
  X0,
  Y0,
  XAxisLength,
  YAxisLength,
} from "../../../constants/chart.constants";
export const Chart = ({
  height,
  width,
  xLabel = "x",
  yLabel = "y",
  children,
  yLabelData,
  yGrid = false,
}: {
  height: number;
  width: number;
  xLabel?: string;
  yLabel?: string;
  children: any;
  yLabelData: number[];
  yGrid?: boolean;
}) => {
  const xAxisY = Y0 + YAxisLength;

  return (
    <svg width={width} height={height}>
      <line
        x1={X0}
        y1={xAxisY}
        x2={X0 + XAxisLength}
        y2={xAxisY}
        stroke="grey"
      />
      {yLabelData.map((_, index) => {
        const y = Y0 + index * (YAxisLength / yLabelData.length);
        return (
          <g key={index}>
            <line
              x1={X0 - 5}
              y1={y}
              x2={yGrid ? XAxisLength : X0}
              y2={y}
              stroke="grey"
              strokeWidth={yGrid ? 0.25 : 1}
            />
            <text x={X0 - 5} y={y + 5} textAnchor="end">
              {yLabelData.length - index}
            </text>
          </g>
        );
      })}
      <text x={X0 + XAxisLength + 5} y={xAxisY + 4}>
        {xLabel}
      </text>

      <line x1={X0} y1={Y0} x2={X0} y2={Y0 + YAxisLength} stroke="grey" />
      <text x={X0} y={Y0 - 8} textAnchor="middle">
        {yLabel}
      </text>
      <g transform={`scale(1,-1) translate(0,-${YAxisLength})`}>{children}</g>
    </svg>
  );
};

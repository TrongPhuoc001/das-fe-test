import { Y0, YAxisLength } from "../../../constants/chart.constants";

export const Bar = ({
  fill,
  x,
  y,
  width,
  height,
  text,
}: {
  fill?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
}) => {
  return (
    <>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill || "red"}
        className="bar"
      >
        <animate
          attributeName="height"
          from="0"
          to={height}
          dur="0.5s"
          fill="freeze"
        />
      </rect>
      <g transform={`scale(1,-1) translate(0,-${YAxisLength})`}>
        <text x={x + width / 2} y={YAxisLength + Y0 + 16} textAnchor="middle">
          {text}
        </text>
      </g>
    </>
  );
};

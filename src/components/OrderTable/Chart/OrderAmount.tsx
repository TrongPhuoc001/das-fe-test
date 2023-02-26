import { useEffect, useState } from "react";
import {
  X0,
  XAxisLength,
  Y0,
  YAxisLength,
} from "../../../constants/chart.constants";
import { Order } from "../../../models/order";
import { randomColor } from "../../../utils/utilsfunction";
import { Chart } from "../../common/chart/chart";
import "./index.css";

interface LineChartData {
  x: string;
  y: number;
}

const weekCaculate = [
  { plus: 0, minus: 7 },
  { plus: 7, minus: 0 },
  { plus: 6, minus: 1 },
  { plus: 5, minus: 2 },
  { plus: 4, minus: 3 },
  { plus: 3, minus: 4 },
  { plus: 2, minus: 5 },
];

const weekLabel = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthLabel = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const OrderAmountChart = ({ orders }: { orders: Order[] }) => {
  const [data, setData] = useState<LineChartData[]>([]);
  const [range, setRange] = useState<"week" | "month">("week");
  const [today, setToday] = useState(new Date());
  useEffect(() => {
    const sortedOrders = orders.sort((a, b) => {
      const aDate = new Date(a.orderDate);
      const bDate = new Date(b.orderDate);
      return aDate.getTime() - bDate.getTime();
    });
    let dateRange = { start: new Date(today), end: new Date(today) };
    if (range === "week") {
      dateRange.start.setDate(
        today.getDate() - weekCaculate[today.getDay()].minus
      );
      dateRange.end.setDate(
        today.getDate() + weekCaculate[today.getDay()].plus
      );
    } else {
      dateRange.start.setDate(1);
      dateRange.end.setDate(31);
    }
    const data = sortedOrders.reduce((acc, order) => {
      const orderDate = new Date(order.orderDate);

      if (orderDate >= dateRange.start && orderDate <= dateRange.end) {
        const label =
          range === "week"
            ? weekLabel[orderDate.getDay()]
            : orderDate.getDate();
        const index = acc.findIndex((d) => d.x === label.toString());
        if (index === -1) {
          acc.push({ x: label.toString(), y: 1 });
        } else {
          acc[index].y += 1;
        }
      }
      return acc;
    }, [] as LineChartData[]);
    setData(data);
  }, [orders, range, today]);
  const dataYMax = data.reduce(
    (currMax, { y }) => Math.max(currMax, y),
    -Infinity
  );
  const barPlotWidth =
    XAxisLength / (range === "week" ? 8 : monthLabel[today.getMonth()] + 1);
  const dataWithCords =
    range === "week"
      ? weekLabel.map((w, i) => {
          const d = data.find((d) => d.x === w);
          const x = X0 + i * barPlotWidth + barPlotWidth / 2;
          if (d) {
            const yRatio = dataYMax !== 0 ? d.y / dataYMax : 0.5;
            const height = yRatio * YAxisLength - Y0;
            return { ...d, cx: x, cy: height };
          } else {
            return { x: w, y: 0, cx: x, cy: -Y0 };
          }
        })
      : Array.from({ length: monthLabel[today.getMonth()] }).map((_, i) => {
          const d = data.find((d) => d.x === (i + 1).toString());
          const x = X0 + (i + 1) * barPlotWidth + barPlotWidth / 2;
          if (d) {
            const yRatio = dataYMax !== 0 ? d.y / dataYMax : 0.5;
            const height = yRatio * YAxisLength - Y0;
            return { ...d, cx: x, cy: height };
          }
          return { x: (i + 1).toString(), y: 0, cx: x, cy: -Y0 };
        });
  return (
    <>
      <Chart
        width={XAxisLength + 2 * X0}
        height={YAxisLength + 2 * Y0}
        xLabel={`${
          range === "week" ? `W${Math.ceil(today.getDate() / 7)}-` : ""
        }${monthNames[today.getMonth()]}`}
        yLabel={"Orders"}
        yLabelData={Array.from({
          length: dataYMax,
        })}
        yGrid={true}
      >
        <path
          d={`M${dataWithCords.map((d) => {
            return `${d.cx} ${d.cy}`;
          })}`}
          stroke="black"
          fill="transparent"
        />
        {dataWithCords.map((d, i) => {
          return (
            <>
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r={5}
                fill={`#${randomColor()}`}
                onMouseOver={(e) => {
                  e.currentTarget.style.opacity = "0.5";
                  const parentNode = e.currentTarget.parentNode;
                  if (!parentNode) return;
                  let text = parentNode.querySelector("#line-tooltip");
                  if (!text) {
                    return;
                  }
                  text.setAttribute("x", (d.cx - 35).toString());
                  text.setAttribute("y", (-d.cy - 10).toString());
                  text.textContent = `${d.x}/${today.getMonth() + 1}: ${
                    d.y
                  } orders`;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.opacity = "1";
                  const parentNode = e.currentTarget.parentNode;
                  if (!parentNode) return;
                  const text = parentNode.querySelector("#line-tooltip");
                  if (!text) return;
                  text.textContent = "";
                }}
              />
              <text transform="scale(1,-1)" x={d.cx - 5} y={Y0 + 20}>
                {d.x}
              </text>
            </>
          );
        })}
        <text id="line-tooltip" transform="scale(1,-1)"></text>
      </Chart>
      <div className="filter-container">
        <select
          className="select"
          onChange={(e) => setRange(e.target.value as "week" | "month")}
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
        </select>
        <div className="change-month-group">
          <button
            className="btn previous-btn"
            onClick={() => {
              const newDate = new Date(today);
              if (range === "week") {
                newDate.setDate(newDate.getDate() - 7);
              } else {
                newDate.setMonth(newDate.getMonth() - 1);
              }

              setToday(newDate);
            }}
          >
            Previous
          </button>
          <p className="month-text">
            {`${range === "week" ? `W${Math.ceil(today.getDate() / 7)}-` : ""}${
              monthNames[today.getMonth()]
            }`}
          </p>
          <button
            className="btn next-btn"
            onClick={() => {
              const newDate = new Date(today);
              if (range === "week") {
                newDate.setDate(newDate.getDate() + 7);
              } else {
                newDate.setMonth(newDate.getMonth() + 1);
              }

              setToday(newDate);
            }}
            disabled={
              new Date().getMonth() === today.getMonth() &&
              new Date().getDate() === today.getDate()
            }
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

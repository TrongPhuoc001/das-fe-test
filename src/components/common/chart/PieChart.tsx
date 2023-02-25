export interface PieChartData {
  label: string;
  value: number;
  color: string;
}

export const PieChart = ({ data }: { data: PieChartData[] }) => {
  return (
    <svg height={600} width={600}>
      {data.map((d, i) => {
        const total = data.reduce((acc, d) => acc + d.value, 0);
        let a0 = 0;
        if (i > 0) {
          a0 = data
            .slice(0, i)
            .reduce((acc, d) => acc + (d.value / total) * 2 * Math.PI, 0);
        }
        return (
          <path
            key={i}
            d={drawArc(300, 300, 200, a0, a0 + (d.value / total) * 2 * Math.PI)}
            fill={d.color}
            data-position={(2 * a0 + (d.value / total) * 2 * Math.PI) / 2}
            onMouseOver={(e) => {
              e.currentTarget.style.opacity = "0.5";
              const dataPosition =
                e.currentTarget.getAttribute("data-position");
              const parentNode = e.currentTarget.parentNode;
              if (!parentNode) return;
              let text = parentNode.querySelector("text");
              if (!text) {
                return;
              }
              const { x, y } = swep(300, 300, 200, +dataPosition!);
              text.setAttribute("x", (x + (x > 300 ? 10 : -10)).toString());
              text.setAttribute("y", (y + (y > 300 ? 10 : -10)).toString());
              text.textContent = `${d.label}: ${d.value}`;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.opacity = "1";
              const parentNode = e.currentTarget.parentNode;
              if (!parentNode) return;
              const text = parentNode.querySelector("text");
              if (!text) return;
              text.textContent = "";
            }}
          />
        );
      })}
      <text
        x={300}
        y={300}
        textAnchor="middle"
        dominantBaseline="middle"
      ></text>
    </svg>
  );
};

const swep = (x: number, y: number, r: number, a: number) => {
  const x1 = x + r * Math.cos(a);
  const y1 = y + r * Math.sin(a);
  return { x: x1, y: y1 };
};

const drawArc = (x: number, y: number, r: number, a1: number, a2: number) => {
  const { x: x1, y: y1 } = swep(x, y, r, a1);
  const { x: x2, y: y2 } = swep(x, y, r, a2);
  const largeArcFlag = a2 - a1 <= Math.PI ? 0 : 1;
  return `M${x} ${y} L${x1} ${y1} A${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
};

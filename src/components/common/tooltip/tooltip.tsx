import "./tooltip.css";

export const Tooltip = ({ message }: { message: string }) => {
  console.log(message);
  return (
    <div className="tooltip">
      <span className="tooltiptext">{message}</span>
    </div>
  );
};

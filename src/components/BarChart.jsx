import { Bar } from "react-chartjs-2";

export const BarChart = ({ chartData, options }) => {
  return (
    <div className="chart-container relative h-2/5 lg:px-10 px-4 pb-2">
      <Bar data={chartData} options={options} />
    </div>
  );
};

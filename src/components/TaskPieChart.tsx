import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Task } from "../features/tasks/taskSlice";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TaskPieChartProps {
  tasks: Task[];
}

const TaskPieChart: React.FC<TaskPieChartProps> = ({ tasks }) => {

  const categoryCounts = tasks.reduce(
    (acc, task) => {
      acc[task.category] += 1;
      return acc;
    },
    {
      Pending: 0,
      "In Progress": 0,
      Completed: 0,
    }
  );

  const data = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [categoryCounts.Pending, categoryCounts["In Progress"], categoryCounts.Completed],
        backgroundColor: ["#FBBF24", "#3B82F6", "#10B981"], 
        hoverBackgroundColor: ["#FACC15", "#2563EB", "#059669"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-xs mx-auto mt-8">
      <Pie data={data} />
    </div>
  );
};

export default TaskPieChart;

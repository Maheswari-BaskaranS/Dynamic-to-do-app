import React from "react";
import { render } from "@testing-library/react";
import TaskPieChart from "./TaskPieChart";
import { Task } from "../features/tasks/taskSlice";

describe("TaskPieChart Component", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "Task 1", category: "Pending", dueDate: "2024-12-15", completed: false },
    { id: "2", title: "Task 2", category: "In Progress", dueDate: "2024-12-20", completed: false },
    { id: "3", title: "Task 3", category: "Completed", dueDate: "2024-12-25", completed: true },
  ];

  it("renders the pie chart correctly", () => {
    const { container } = render(<TaskPieChart tasks={mockTasks} />);
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});

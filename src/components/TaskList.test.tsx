import React from "react";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import { Task } from "../features/tasks/taskSlice";

describe("TaskList Component", () => {
  const mockTasks: Task[] = [
    { id: "1", title: "Task 1", category: "Pending", dueDate: "2024-12-15", completed: false },
    { id: "2", title: "Task 2", category: "Pending", dueDate: "2024-12-20", completed: false },
  ];

  const mockOnEditTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  it("renders tasks correctly", () => {
    render(<TaskList title="Pending" tasks={mockTasks} onEditTask={mockOnEditTask} onDeleteTask={mockOnDeleteTask} />);
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("renders correct number of tasks", () => {
    render(<TaskList title="Pending" tasks={mockTasks} onEditTask={mockOnEditTask} onDeleteTask={mockOnDeleteTask} />);
    const taskItems = screen.getAllByRole("listitem");
    expect(taskItems).toHaveLength(mockTasks.length);
  });
});
